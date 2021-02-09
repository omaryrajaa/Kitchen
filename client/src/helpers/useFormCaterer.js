import { useState, useEffect } from 'react';
import axios from 'axios';



const useFormCaterer = (callback, validate) => {

  const [values, setValues] = useState({
    firstname: '',
    lastname:'',
    shopname:'',
    shopdescription:'',
    email: '',
    password: '',
    password2: '',
    address: '',
    phone: '',
    shoplogo:'',
    accountNumber: '',
    delivery:true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
        createCaterer();

      }
    },
    [errors]
  );

  const createCaterer = () => {

    axios.post(`/api/caterers/register`, {
      
      firstname:values.firstname, 
      lastname:values.lastname, 
      shopname:values.shopname, 
      shopdescription:values.shopdescription, 
      shoplogo:values.shoplogo,
      address:values.address, 
      phone:values.phone, 
      email:values.email,  
      password:values.password,
      accountNumber:values.accountNumber, 
      delivery:values.delivery,
      latitude:0, 
      longitude:0
      
    })
    .then(res => {

    //    dispatch({ type: SET_NEW_CATERER, newCaterer: res.data });   
    
    })
    .catch(err => console.log(err.msg))
    
  }


  return { handleChange, handleSubmit, values, errors };
};

export default useFormCaterer;