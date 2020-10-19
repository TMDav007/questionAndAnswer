import React, { Component, useState } from 'react'
import ReactDOM from "react-dom";
import { connect } from 'react-redux';

import formValidation from "./formValidation";
import validateAuth from "./validateAuth";

const INITIAL_STATE = {
  email: "",
  password: ""
}

function login(props) {
  const { isloading, message, removeMessage, loginUser} = props.props;
  const { handleChange, handleBlur, handleSubmit,login,errors, values, } = formValidation(INITIAL_STATE, validateAuth);

  const onSubmitLogin = () => {
    handleSubmit.call(this, event);
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors){
      loginUser(values);
    }
  }

  return (
    <div id='showcase'>
      <div id='bg-image'></div>
      <div className='content-wrap words'>
        <div id='question_answer'>
          {message && 
                  <div id='modal_error_display'>
                  <div id='serverMessage'>
                    <span className="popup_close" onClick={() => removeMessage() } >&times;</span>
                    { message }
                  </div>
                </div>}
          <div id='get_started'>
            <h1>QuestionAnswer</h1>
            <p>Get answers to your questions</p>
            <form onSubmit={onSubmitLogin}>
              <div className='email'>
                <label htmlFor='email'></label>
                <input
                  className={errors.email && 'error-input'}
                  placeholder='email'
                  type='email'
                  name='email'
                  value={values.email}
                  noValidate
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete='off'
                />
                {errors.email && <span className='error-text'>{errors.email} </span>}
              </div>


              <div className='password'>
                <label htmlFor='password'></label>
                <input
                  className={errors.password && 'error-input'}
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={values.password}
                  formNoValidate
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete='off'
                />
                {errors.password && <span className='error-text'>{errors.password} </span>}
              </div>
              <div className="login">
                <button disabled={isloading} type='submit' id='submit'>Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

} 


export default login;
