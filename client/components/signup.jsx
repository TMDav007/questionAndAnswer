import React, { Component, useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { toast } from 'react-toastify'

import formValidation from "./formValidation";
import validateAuth from "./validateAuth";
import Spinners from './../components/spinner/spinner.component';




const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  password_confirmation: ""
}


function signup (props) {
  const { registerUser, isLoading, message, removeMessage , currentUser} = props.props;
  const { handleChange, handleBlur,handleSubmit, errors, values} = formValidation(INITIAL_STATE, validateAuth);

  const onSubmitSignup = () => {
    handleSubmit.call(this, event);
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors){
      registerUser(values);
    }
  
  }

  useEffect( ()=> {
    currentUser? history.push("/dashboard") : ""
  }, [])

    return (
      <div id='showcase'>
        <div id='bg-image'></div>
        <div className='content-wrap words'>
          <div id='question_answer'>
          {message &&  toast.success(message)}
            <div id='get_started'>
              <h1>QuestionAnswer</h1>
              <p>Get answers to your questions</p>
              <form onSubmit={onSubmitSignup}>
                <div className= 'username'>
                  <label htmlFor='username'></label>
                  <input 
                    className={errors.username && 'error-input'}
                    placeholder='Username'
                    type='text'
                    name='username'
                    value={values.username}
                    noValidate
                    onBlur={handleBlur}
                    onChange={handleChange}
                    />
                    {errors.username && <span className='error-text'>{errors.username} </span>}
                </div>
                <div className= 'email'>
                  <label htmlFor='email'></label>
                  <input 
                    className={errors.email && 'error-input'}
                    placeholder='email'
                    type='email'
                    name='email'
                    value={values.email}
                    formNoValidate
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete='off'
                    />
                    {errors.email && <span className='error-text'>{errors.email} </span>}
                </div>
                <div className= 'password'>
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
                <div className= 'confirmPassword'>
                  <label htmlFor='confirm password'></label>
                  <input 
                    className={errors.password_confirmation && 'error-input'}
                    placeholder='Confirm Password'
                    type='password'
                    name='password_confirmation'
                    value={values.password_confirmation}
                    noValidate
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete='off'
                    />
                    {errors.password_confirmation && <span className='error-text'>{errors.password_confirmation}</span>}
                </div>
                <div className="login">
                  <button disabled={isLoading} type='submit' id='submit'>Get Started</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}



export default signup
