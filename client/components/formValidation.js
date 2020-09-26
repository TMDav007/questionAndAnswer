import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect} from 'react-router-dom';
import history from './../src/history';

import loginUser from './loginUser';

const api = axios.create({
  baseURL: `https://questionsandanswer.herokuapp.com`
})


function formValidation(initalState, validate) {
  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [isMessage, setMessage] = useState("");
  const [createNewUser, setCreateNewUser] = useState(false);
  const [loginUser, setloginUser] = useState(false);


  let validationErrors = validate(values);

  useEffect(() => {
    //console.log(handleSubmit.signup, "hdhd")
    if (createNewUser) {
      console.log(errors);
      const noErrors = Object.keys(errors).length === 0;
      console.log(noErrors, "error");
      if (noErrors) {
       createUser(values);
        //loginUser(values);
      } else {
        setSubmitting(false);
      }
    } 
    if (loginUser) {
      console.log(errors);
      const noErrors = Object.keys(errors).length === 0;
      console.log(noErrors, "no error");

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
  }

  const signup = (event) => {
    handleSubmit.call(this, event);
    setCreateNewUser(true);
  }
  const login = (event) => {
    handleSubmit.call(this, event);
    setloginUser(true);
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

  return { handleBlur, handleChange, handleSubmit,Dialog, errors, values, createNewUser,signup,loginUser,login,setSubmitting, isMessage }
}

export default formValidation;