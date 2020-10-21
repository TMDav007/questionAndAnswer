import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect} from 'react-router-dom';
import history from './../src/history';



const api = axios.create({
  baseURL: `https://questionsandanswer.herokuapp.com`
})


const formValidation = (initalState, validate) => {
  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isMessage, setMessage] = useState("");
  const [createNewUser, setCreateNewUser] = useState(false);
  const [loginUser, setloginUser] = useState(false);


  let validationErrors = validate(values);


  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
    setErrors(validationErrors);
  }

  function handleBlur() {
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  const signupp = (event) => {
    handleSubmit.call(this, event);
    setCreateNewUser(true);
  }



  return { handleBlur, handleChange, handleSubmit, errors, values, signupp,setSubmitting, isMessage }
}


export default formValidation;