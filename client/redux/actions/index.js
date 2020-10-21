import axios from 'axios';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../actionTypes'; 
import jwt from 'jsonwebtoken';

import { setToken } from '../setToken';
import history from './../../src/history';
import setAuthorizationToken from './../utils';

let token;
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
export const setCurrentUser = (user) => {
    return {
      type: actionTypes.SET_CURRENT_USER,
      user
    }
}
export const loginUser = (value) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.post('/api/v1/auth/login', value);
     token = response.data.data.token;
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: response
    })
 
    setTimeout(() => { 
      dispatch({
      type: actionTypes.REMOVE_MESSAGE
    })  
    history.push("/dashboard") }, 2000);
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

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
  window.location.reload();
}