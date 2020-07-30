import React, {useState, useEffect } from  "react";
import axios from "axios";

const api = axios.create({
  baseURL: `https://questionsandanswer.herokuapp.com/`
})

function formValidation(initalState, validate) {
  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  let validationErrors = validate(values);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        //console.log("authenticated!", values)
        createUser(values);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors])

  function handleChange(event){
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
    setSubmitting(true);
  }

  return { handleBlur, handleChange, handleSubmit, errors, values, isSubmitting }
}

const createUser = async (value) => {
  try {
    const userData = value;
    let response = await api.post('/api/v1/auth/signup', userData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

}

export default formValidation;