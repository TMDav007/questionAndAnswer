import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect} from 'react-router-dom';
import history from './../src/history';

const api = axios.create({
  baseURL: `https://questionsandanswer.herokuapp.com`
})


function formValidation(initalState, validate) {
  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isMessage, setMessage] = useState("");


  let validationErrors = validate(values);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        createUser(values);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors])

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
    setSubmitting(true);
  }

  const createUser = async (value) => {
    try {
      let response = await api.post('/api/v1/auth/signup', value);
        setMessage("Sign up was successful, you can now login");
        setTimeout(() => { setMessage(null) }, 2000)
        history.push("/login") 
        window.location.reload(); 
    } catch (error) {
      console.log(error)
      if (error.response){
        console.log(error.response);
        if (error.response.status === 409){
          setMessage(error.response.data.message);
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        }
        if (error.response.status === 500) {
          validationErrors = (error.response.data.data.error);
          setErrors(validationErrors);  
        }  
      }
    }
  }

  //display server message
  const Dialog = (props) => {
    return (
      <div id='modal_error_display'>
        <div id='serverMessage'>
          <span className="close" onClick={() => setMessage(null)} >&times;</span>
          {props.props}
        </div>
      </div>
    )
  }

  return { handleBlur, handleChange, handleSubmit, Dialog, errors, values, isSubmitting, isMessage }
}

export default formValidation;