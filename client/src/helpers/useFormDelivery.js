import { useState, useEffect } from "react";
import axios from "axios";

const useFormDelivery = (callback, validate) => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    phone: "",
    accountNumber: "",
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
    createDelivery();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const createDelivery = (errors) => {
    axios
      .post(`/api/delivery_agents/register`, {
        firstname: values.firstname,
        lastname: values.lastname,
        address: values.address,
        phone: values.phone,
        email: values.email,
        password: values.password,
        accountNumber: values.accountNumber,
      })
      .then((res) => {
        if (
          res.data.msg ===
          "Sorry, a user account with this email already exists"
        ) {
          setErrors({ msg: "email exists already" });
          alert("Email exists already!");
        }
      })
      .catch((err) => err.msg);
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useFormDelivery;
