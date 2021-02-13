export default function validateInfoDelivery(values) {
  let errors = {};

  if (!values.lastname.trim()) {
    errors.lastname = "Last name required";
  }

  if (!values.firstname.trim()) {
    errors.firstname = "First name required";
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }
  if (!values.address) {
    errors.address = "Address required";
  }

  if (!values.accountNumber) {
    errors.accountNumber = "Account Number required";
  }

  if (!values.phone) {
    errors.phone = "Phone number required";
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phone)
  ) {
    errors.phone = "Phone number is invalid";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }
  return errors;
}
