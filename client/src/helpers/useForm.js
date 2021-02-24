import { useState, useEffect } from "react";
import axios from "axios";
import useApplicationData from "../hooks/useApplicationData";
import { SET_NEW_CUSTOMER } from "../reducers/dataReducer";


const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state, dispatch } = useApplicationData();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      createCustomer();
    }
  }, [errors]);

  const createCustomer = () => {
    axios
      .post(`/api/customers/register`, {
        name: values.username,
        address: values.address,
        phone: values.phone,
        email: values.email,
        password: values.password
      })
      .then((res) => {
        if (
          res.data.msg ===
          "Sorry, a user account with this email already exists"
        ) {
          setErrors({ msg: "email exists already" });
          alert("Email exists already!");
        } else {
          dispatch({ type: SET_NEW_CUSTOMER, newCustomer: res.data });
        }
      })
      .catch((err) => err.msg);
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
