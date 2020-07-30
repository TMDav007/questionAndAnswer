import React, { Component, useState } from 'react'
import ReactDOM from "react-dom";

import formValidation from "./formValidation";
import validateAuth from './validateAuth';

const INITIAL_STATE = {
  email: "",
  password: ""
}

function login() {
  const { handleChange, handleSubmit, handleBlur, errors, values, isSubmitting } = formValidation(INITIAL_STATE, validateAuth);

    return (
      <div id='showcase'>
        <div id='bg-image'></div>
        <div className='content-wrap words'>
          <div id='question_answer'>
            <div id='get_started'>
              <h1>QuestionAnswer</h1>
              <p>Get answers to your questions</p>
              <form onSubmit={handleSubmit}>
                <div className= 'email'>
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
                <div className="login">
                  <button disabled={isSubmitting} type='submit' id='submit'>Log in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default login
