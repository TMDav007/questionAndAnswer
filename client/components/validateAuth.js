import React from 'react'

function validateAuth(values) {
  let errors = {};
  //email check
  if (!values.email) {
    errors.email = 'Required Email';
  } else if (
    !/^[A-Z0-9._%]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ){
    errors.email = 'invalid email address';
  }
  //Password check
  if (!values.password) {
    errors.password = "Required Password";
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } 

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required Password";
  } else if (values.password != values.confirmPassword) {
    errors.confirmPassword = 'password must match';
  } 

  //username check
  if (!values.username) {
    errors.username = "Required Username";
  } else if (values.username.length < 6) {
    errors.username = 'Username must be at least 6 characters';
  } 
  return errors;
}

export default validateAuth;