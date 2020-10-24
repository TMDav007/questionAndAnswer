import React from 'react'

function validateAuth(values) {
  let errors = {};

    //Question
   //Questioncheck
   if (values.hasOwnProperty('question')) {
    if (!values.question) {
      errors.question = 'Question is required';
    } 
   }

  //email check
  if (values.hasOwnProperty('email')) {
    if (!values.email) {
      errors.email = 'Required Email';
    } else if (
      !/^[A-Z0-9._%]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ){
      errors.email = 'invalid email address';
    }
  }

  //Password check
if (values.hasOwnProperty('password')) {
  if (!values.password) {
    errors.password = "Required Password";
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } 
}



  if (values.hasOwnProperty('password_confirmation') ) {
    if (!values.password_confirmation) {
      errors.password_confirmation = "Required Password";
    } else if (values.password != values.password_confirmation) {
      errors.password_confirmation= 'password must match';
    } 
  
  }  

  //username check
  if (values.hasOwnProperty('username') ) {
    if (!values.username) {
      errors.username = "Required Username";
    } else if ( values.username.length < 6) {
      errors.username = 'Username must be at least 6 characters';
    } 
  }




  return errors;
}


export default validateAuth;
