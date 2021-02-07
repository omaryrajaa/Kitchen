 
import React, { useState } from 'react';
import withRoot from '../modules/withRoot';
import './SignUp.css';
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';
import Header from '../components/Header';


const SignUpCustomer = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <Header />
      <div className='form-container'>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
     
    </>
  );
};

export default withRoot(SignUpCustomer);