import * as actionTypes from '../actionTypes'
import initialState from './../state';

const questionsReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch(type){
      case actionTypes.FETCH_ALL_QUESTIONS:
        return {
          allQuestions: payload,
          comments :[],
          isLoading:false
        }
        case actionTypes.GET_ALL_MY_QUESTION:
          return {
            allQuestions: payload,
            isLoading: false
          }
        case actionTypes.GET_ALL_MY_QUESTION_FAIL:
          return {
            ...state,
            errors: payload,
            serverMessage: payload,
            isLoading: false
          }
        case actionTypes.GET_A_QUESTION:
          return {
            ...state,
            question: payload,
            isLoading: false
          }
      case actionTypes.FETCH_ALL_QUESTIONS_FAIL:
        return {
          ...state,
          errors: payload,
          serverMessage: payload,
          isLoading: false
        }
      case actionTypes.ASK_QUESTION, actionTypes.DELETE_QUESTION:
        return {
          ...state,
          isLoading: false
        }
 /*       case actionTypes.DELETE_QUESTION:
          return {
            ...state,
            isLoading: false
          } */
      case actionTypes.ASK_QUESTION_FAIL, actionTypes.DELETE_QUESTION_FAIL:
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
      case actionTypes.IS_SHOW:
        return {
          ...state,
          show: true
        }
      case actionTypes.IS_EDIT:
        return {
          ...state,
          submitType: "Edit"
        }
        case actionTypes.IS_ASK:
          return{
            ...state,
            submitType: "Ask"
          }
      default:
        return state;
    } 
}

export default questionsReducer;