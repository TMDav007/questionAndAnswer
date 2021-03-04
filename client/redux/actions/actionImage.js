import axios from 'axios';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../actionTypes'; 
import jwt from 'jsonwebtoken';

import { setToken } from './../setToken';
import history from './../../src/history';
import setAuthorizationToken from './../utils';

let token;
const api = axios.create({
  baseURL: `https://questionsandanswer.herokuapp.com`
 // baseURL: `http://localhost:8000/`
})

export const addImage = (value) => async dispatch => {
  dispatch({
    type:actionTypes.IS_LOADING
  })
  console.log(value)
  try {
    let response = await api.post('/api/v1/image', {title : value.title, image: value.image}, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    console.log(response, "getResponse")
    dispatch({
      type: actionTypes.ADD_IMAGE,
      payload: response.data.data.newQuestion
    })
  } catch(error) {
    console.log(error.response, "imageError")
    if(!error.response.data){
      return dispatch({
        type: actionTypes.ADD_IMAGE_FAIL,
        payload: error.message
      }) }
   return dispatch({
      type: actionTypes.ADD_IMAGE_FAIL,
      payload: error.response.data.message
    })
  }
}



export const getImage = () => async dispatch => {
  dispatch({
    type:actionTypes.IS_LOADING
  })
  try {
    let response = await api.get(`/api/v1/image`, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    console.log(response, "getResponse")
    dispatch({
      type: actionTypes.GET_IMAGE,
      payload: response.data.data
    })
  } catch(error) {
    console.log(error.response, "imageError")
    if(!error.response.data){
      return dispatch({
        type: actionTypes.GET_IMAGE_FAIL,
        payload: error.message
      }) }
   return dispatch({
      type: actionTypes.GET_IMAGE_FAIL,
      payload: error.response.data.message
    })
  }
}