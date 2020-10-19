import axios from 'axios';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../actionTypes'; 

import { setToken } from '../setToken';
import history from './../../src/history';

const api = axios.create({
  baseURL: `https://questionsandanswer.herokuapp.com`
})

export const registerUser = (value) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.post('/api/v1/auth/signup', value);
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: response.data
    })

    setTimeout(() => { 
      dispatch({
      type: actionTypes.REMOVE_MESSAGE
    })  
      history.push("/login")
      window.location.reload() }, 2000);


  } catch (error) {
    if (!error.response) {
      return dispatch({
        type: actionTypes.REGISTER_FAIL,
        payload: error.message
      }) }
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const removeMessage = () => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_MESSAGE
  })
}

export const loginUser = (value) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.post('/api/v1/auth/login', value);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: response.data
    })
    setTimeout(() => { 
      dispatch({
      type: actionTypes.REMOVE_MESSAGE
    })  
     history.push("/dashboard")
     window.location.reload() }, 2000);
  } catch (error) {
    if (!error.response) {
     return dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: error.message
      }) }
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response.data.message
    })
  }
}