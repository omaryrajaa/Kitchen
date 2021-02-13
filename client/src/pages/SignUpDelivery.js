import React, { useState } from "react";
import withRoot from "../modules/withRoot";
import "./SignUp.css";
import FormSignupDelivery from "./FormSignupDelivery";
import FormSuccessCaterer from "./FormSuccessCaterer";
import Header from "../components/Header";

const SignUpDelivery = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <Header />
      <div className="form-container">
        {!isSubmitted ? (
          <FormSignupDelivery submitForm={submitForm} />
        ) : (
          <FormSuccessCaterer />
        )}
      </div>
    </>
  );
};

export default withRoot(SignUpDelivery);
