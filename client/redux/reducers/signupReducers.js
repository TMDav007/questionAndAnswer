import * as actionTypes from '../actionTypes'
import initialState  from './../state'

const signupReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch(type){
      case actionTypes.REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isRegistered: true,
          serverMessage: "Sign up was successful, you can now login"
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
      case actionTypes.REGISTER_FAIL:
        return {
          ...state,
          isLoading: false,
          isRegistered: false,
          errors: payload,
          serverMessage: payload
        }
      default:
        return state;
    } 
}

export default signupReducer;