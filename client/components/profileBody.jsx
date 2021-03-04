import React, {useEffect, useState, useRef, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {} from './../assets/images/img1.jpg';

import formValidation from './formValidation';
import validateAuth from './validateAuth';
import {addImage } from './../redux/actions/actionImage';
import {editUser, getUser } from './../redux/actions/index';

const INITIAL_STATE = {
  image: "",
  user_name: "",
  email: "",
  phone_no: ""
}

export let ProfileBody =(props) => {
  const {addImage, isLoading, user, editUser, getUser} = props;
   const {handleChange, handleBlur, handleSubmit, errors, values} = formValidation(INITIAL_STATE, validateAuth);

  const onSubmitImg= (event) => {
    handleSubmit.call(this, event);
    values.title = values.image.slice(-9, -5)
    editUser(values);
  }

  useEffect( ()=> {
    getUser()
  }, [])
    return (
      <div className="containa">
        <div id="user-background-image"></div>
        <div className="main-content">
          <div id="sidebar_space"></div>
         
          <div id="content_space">
          <h2 style={{position: "relative", right: "4em", fontFamily: "'Montserrat', sans-serif"}}>Edit Profile</h2>
              <form onSubmit={onSubmitImg}>
           
            <div id="profile_form">     
                <label htmlFor="username"> </label>
                <input 
                 type="text"
                 name="user_name" 
                 value={values.user_name} 
                 onChange={handleChange}
                 onBlur={handleBlur}
                 placeholder={user.user_name} />

                <br/>
                <br/>
                <label htmlFor="email"></label>
                <input type="text" 
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}placeholder={user.email} disabled />

                <br/>
                <br/>
                <label htmlFor="phone no"></label>
                <input 
                  type="text"
                  name="phone_no"
                  value={values.phone_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={user.phone_no} />

                <br/>
                <br/>
                <button type="submit" id="submit" >Submit
                </button>
                </div>
              </form>
          </div>
        </div>
     </div>
    )
}

const mapStateToProps = (state) => ({
  isLoading: state.image.isLoading,
  user: state.image.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (value) => dispatch(getUser(value)),
    editUser: (value) => dispatch(editUser(value))
    
  }
}

ProfileBody = connect(mapStateToProps,mapDispatchToProps)(ProfileBody)
