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
   // baseURL: `https://questionsandanswer.herokuapp.com`
   baseURL: `http://localhost:8000/`
})


export const commentx = (value) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.post('/api/v1/comments', value, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    console.log(response, "commentResponse")
    dispatch({
      type: actionTypes.COMMENT,
      payload: response.data.data.newQuestion
    })

  } catch(error) {
    console.log(error.response, "commentError")
      if(!error.response.data){
      return dispatch({
        type: actionTypes.COMMENT_FAIL,
        payload: error.message
      }) }
   return dispatch({
      type: actionTypes.COMMENT_FAIL,
      payload: error.response.data.message
    })
  }
}

export const getComments = (questionId) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.get(`/api/v1/comments/${questionId}`, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    dispatch({
      type: actionTypes.GET_COMMENTS,
      payload: response.data.data.Comments
    })
  } catch (error) {
    if(!error.response){
      return dispatch({
        type: actionTypes.GET_COMMENTS_FAIL,
        payload: error.message
      })
    }
    dispatch({
      type: actionTypes.GET_COMMENTS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const editComment = (values) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.put(`/api/v1/comments/${values.id}`,  {comment: values.comment}, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    console.log(response);
    dispatch({
      type: actionTypes.ASK_QUESTION,
      payload: response
    })
  } catch(error) {
    console.log(error)
    if(!error.response.data){
      return dispatch({
        type: actionTypes.ASK_QUESTION_FAIL,
        payload: error.message
      }) }
   return dispatch({
      type: actionTypes.ASK_QUESTION_FAIL,
      payload: error.response.data.message
    })
  }
}

export const deleteAComment = (element) => async dispatch => {
  try {
    let response = await api.delete(`/api/v1/comments/${element.questId}/${element.id}`, {
      headers: {
        'x-access-token': localStorage.token
      }
    });

    dispatch({
      type: actionTypes.DELETE_QUESTION,
      payload: response
    })
  }
  catch (error) {
    if(!error.response.data){
      return dispatch({
        type: actionTypes.DELETE_QUESTION_FAIL,
        payload: error.message
      }) }
   return dispatch({
      type: actionTypes.DELETE_QUESTION_FAIL,
      payload: error.response.data.message
    })
  }
}