import React from "react";
import "./SignUp.css";

const FormSuccess = () => {
  return (
    <div className="form-content-right">
      <h1 className="form-success">
        You are now registred, please Sign In <a href="/login-customer">here</a>
      </h1>
    </div>
  );
};

export default FormSuccess;
