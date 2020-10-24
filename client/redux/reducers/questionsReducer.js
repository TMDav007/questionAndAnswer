import * as actionTypes from '../actionTypes'
import initialState from './../state';

const questionsReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch(type){
      case actionTypes.FETCH_ALL_QUESTIONS:
        return {
          allQuestions: payload
        }
        case actionTypes.GET_ALL_MY_QUESTION:
          return {
            allQuestions: payload
          }
        case actionTypes.GET_ALL_MY_QUESTION_FAIL:
          return {
            ...state,
            errors: payload,
            serverMessage: payload
          }
      case actionTypes.FETCH_ALL_QUESTIONS_FAIL:
        return {
          ...state,
          errors: payload,
          serverMessage: payload
        }
      case actionTypes.ASK_QUESTION:
        return {
          ...state,
          isLoading: false
        }
      case actionTypes.ASK_QUESTION_FAIL:
        return {
          ...state,
          isLoading: false,
          errors: payload,
          serverMessage: payload
        }
      case actionTypes.REMOVE_MESSAGE:
        return {
          ...state,
          serverMessage: ""
        }
      case actionTypes.IS_LOADING:
        return {
          ...state,
          isLoading: true
        }
      default:
        return state;
    } 
}

export default questionsReducer;