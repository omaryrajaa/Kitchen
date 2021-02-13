import React, { useState } from "react";
import withRoot from "../modules/withRoot";
import "./SignUp.css";
import FormSignupCaterer from "./FormSignupCaterer";
import FormSuccessCaterer from "./FormSuccessCaterer";
import Header from "../components/Header";

const SignUpCaterer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <Header />
      <div className="form-container">
        {!isSubmitted ? (
          <FormSignupCaterer submitForm={submitForm} />
        ) : (
          <FormSuccessCaterer />
        )}
      </div>
    </>
  );
};

export default withRoot(SignUpCaterer);
