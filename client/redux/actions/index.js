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
 baseURL: `https://questionsandanswer.herokuapp.com/`
 // baseURL: `http://localhost:8000/`
  //"x-access-token": localStorage.token
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
    dispatch({
      type: actionTypes.TOGGLE_LOADER
    })
    console.log(error.response.data.data.error)
    if (error.message) {
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

export const getAQuestion = (data) => dispatch => {
  localStorage.setItem("data", JSON.stringify(data))
  dispatch({
    type: actionTypes.GET_A_QUESTION,
    payload: data
  })
}

export const isEdit = () => dispatch => {
  dispatch({
    type: actionTypes.IS_EDIT
  })
}
export const isAsk = () => dispatch => {
  dispatch({
    type: actionTypes.IS_ASK
  })
}

export const showModal = () => dispatch => {
  dispatch({
    type: actionTypes.IS_SHOW
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
  dispatch({
    type: actionTypes.TOGGLE_LOADER
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
     dispatch({
        type: actionTypes.LOGIN_FAIL,
        payload: error.message
      }) 
     return setTimeout(() => { 
        dispatch({
        type: actionTypes.REMOVE_MESSAGE
      }) }, 2000);
    }
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: error.response.data.message
    })
    setTimeout(() => { 
      dispatch({
      type: actionTypes.REMOVE_MESSAGE
    }) }, 2000);
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
  history.push("/login");
  window.location.reload();
}

export const getAllQuestions = () => async dispatch => {
  try {
    let response = await api.get('/api/v1/questions', {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    dispatch({
      type: actionTypes.TOGGLE_LOADER
    })
    dispatch({
      type: actionTypes.FETCH_ALL_QUESTIONS,
      payload: response.data.data.questions
    })
  } catch(error) {
      if(!error.response){
      return dispatch({
        type: actionTypes.FETCH_ALL_QUESTIONS_FAIL,
        payload: error.message
      }) }
    dispatch({
      type: actionTypes.FETCH_ALL_QUESTIONS_FAIL,
      payload: error.response.data.message
    })
    setTimeout(() => { 
      if(error.response.status === 401){
        localStorage.removeItem('token');
      }
      history.push("/login")
      window.location.reload() }, 2000);
  }
}

export const askQuestion = (value) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.post('/api/v1/questions', {question: value.question, date: value.date}, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    console.log(response);
    response ? 
    dispatch({
      type: actionTypes.ASK_QUESTION,
      payload: response
    }) :   dispatch({
      type: actionTypes.IS_LOADING
    })
  return dispatch({
      type: actionTypes.FETCH_ALL_QUESTIONS,
      payload: response.data.data.questions
    })
  } catch(error) {
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

export const getAllMyQuestions = () => async dispatch => {
  try {
    let response = await api.get('/api/v1/questions/user', {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    dispatch({
      type: actionTypes.GET_ALL_MY_QUESTION,
      payload: response.data.data.Questions
    })
  } catch(error) {
      if(!error.response){
      return dispatch({
        type: actionTypes.GET_ALL_MY_QUESTION_FAIL,
        payload: error.message
      }) }
    dispatch({
      type: actionTypes.GET_ALL_MY_QUESTION_FAIL,
      payload: error.response.data.message
    })
  }
}

export const editQuestion = (values) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.put(`/api/v1/questions/${values.id}`,  {question: values.question, date: values.date}, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    dispatch({
      type: actionTypes.ASK_QUESTION,
      payload: response
    })
  } catch(error) {
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

export const editUser = (values) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.put(`/api/v1/user`,  {user_name: values.question, phone_no: values.phone_no}, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    dispatch({
      type: actionTypes.EDIT_USER,
      payload: response
    })
  } catch(error) {
      if(!error.response.data){
      return dispatch({
        type: actionTypes.EDIT_USER_FAIL,
        payload: error.message
      }) }
   return dispatch({
      type: actionTypes.EDIT_USER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const getUser = () => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.get(`/api/v1/user`, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    dispatch({
      type: actionTypes.GET_USER,
      payload: response
    })
  } catch(error) {
      if(!error.response.data){
      return dispatch({
        type: actionTypes.GET_USER_FAIL,
        payload: error.message
      }) }
   return dispatch({
      type: actionTypes.GET_USER_FAIL,
      payload: error.response.data.message
    })
  }
}

export const deleteAQuestion = (element) => async dispatch => {
  dispatch({
    type: actionTypes.IS_LOADING
  })
  try {
    let response = await api.delete(`/api/v1/questions/${element}`, {
      headers: {
        'x-access-token': localStorage.token
      }
    });
    console.log(response)
    response ? 
    dispatch({
      type: actionTypes.DELETE_QUESTION,
      payload: response
    }) :   dispatch({
      type: actionTypes.IS_LOADING
    })
  }
  catch (error) {
    console.log(error);
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