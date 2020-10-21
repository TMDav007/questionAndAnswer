import * as actionTypes from '../actionTypes'
import initialState from './../state';

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch(type){
      case actionTypes.LOGIN_SUCCESS:
        localStorage.setItem('token',payload.data.data.token);
          return {
            ...state,
            isLoading: false,
            isLoggedIn: true,
            serverMessage: "you have successfully logged in"
          }
      case actionTypes.LOAD_USER:
        localStorage.getItem('token');
        return {
          ...state,
          isLoggedIn: true
        }        
      case actionTypes.IS_LOADING:
        return {
          ...state,
          isLoading: true
        }
      case actionTypes.REMOVE_MESSAGE:
        return {
          ...state,
          serverMessage: ""
        }

      case actionTypes.AUTH_ERROR: 
      case actionTypes.LOGIN_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
          errors: payload,
          serverMessage: payload
        }
      default:
        return state;
    } 
}

export default loginReducer;