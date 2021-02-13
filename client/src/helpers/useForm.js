import { useState, useEffect } from "react";
import axios from "axios";

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
        password: values.password,
        latitude: 0,
        longitude: 0,
      })
      .then((res) => {
        //    dispatch({ type: SET_NEW_CUSTOMER, newCustomer: res.data });
      })
      .catch((err) => console.log(err.msg));
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
