import React from "react";
import validate from "../helpers/validateInfoCaterer";
import useForm from "../helpers/useFormCaterer";
import "./SignUp.css";

const FormSignupCaterer = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className="form-inputs">
          <label className="form-label">First Name</label>
          <input
            className="form-input"
            type="text"
            name="firstname"
            placeholder="Enter your first name"
            value={values.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Last Name</label>
          <input
            className="form-input"
            type="text"
            name="lastname"
            placeholder="Enter your last name"
            value={values.lastname}
            onChange={handleChange}
          />
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Shop Name</label>
          <input
            className="form-input"
            type="text"
            name="shopname"
            placeholder="Enter your shop name"
            value={values.shopname}
            onChange={handleChange}
          />
          {errors.shopname && <p>{errors.shopname}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Shop Logo</label>
          <input
            className="form-input"
            type="text"
            name="shoplogo"
            placeholder="Enter your shop logo URL"
            value={values.shoplogo}
            onChange={handleChange}
          />
          {errors.shoplogo && <p>{errors.shoplogo}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">About your Shop</label>
          <input
            className="form-input"
            type="text"
            name="shopdescription"
            placeholder="Enter your shop description"
            value={values.shopdescription}
            onChange={handleChange}
          />
          {errors.shopdescription && <p>{errors.shopdescription}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Address</label>
          <input
            className="form-input"
            type="text"
            name="address"
            placeholder="Enter your address"
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Phone number</label>
          <input
            className="form-input"
            type="phone"
            name="phone"
            placeholder="111-111-1111"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Account number</label>
          <input
            className="form-input"
            type="text"
            name="accountNumber"
            placeholder="Enter Your Account Number"
            value={values.accountNumber}
            onChange={handleChange}
          />
          {errors.accountNumber && <p>{errors.accountNumber}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="Confirm your password"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Already have an account? Login <a href="/login">here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignupCaterer;
