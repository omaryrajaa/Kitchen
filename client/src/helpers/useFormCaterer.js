import { useState, useEffect } from "react";
import axios from "axios";
import useGeoPosition from "../hooks/useGeoPosition";

const useFormCaterer = (callback, validate) => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    shopname: "",
    shopdescription: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    phone: "",
    shoplogo: "",
    accountNumber: "",
    delivery: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [position, geoloading, geoerror] = useGeoPosition(
    process.env.REACT_APP_GOOGLE_API_KEY,
    values.address
  );

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
    createCaterer();
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const createCaterer = (errors) => {
    axios
      .post(`/api/caterers/register`, {
        firstname: values.firstname,
        lastname: values.lastname,
        shopname: values.shopname,
        shopdescription: values.shopdescription,
        shoplogo: values.shoplogo,
        address: values.address,
        phone: values.phone,
        email: values.email,
        password: values.password,
        accountNumber: values.accountNumber,
        delivery: values.delivery,
        latitude: position.lat,
        longitude: position.lng,
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

export default useFormCaterer;
