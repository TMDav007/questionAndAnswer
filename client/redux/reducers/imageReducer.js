import * as actionTypes from '../actionTypes';
import initialState from './../state';

const imageReducer = (state=initialState, action) => {
  const {type, payload} = action;
  switch(type){
    case actionTypes.ADD_IMAGE:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.ADD_IMAGE_FAIL:
      return{
        ...state,
        isLoading: false,
        error: payload,
        serverMessage: payload
      }
    case actionTypes.GET_IMAGE:
      return{
        ...state,
        isLoading: false,
        image: payload
      }
    case actionTypes.GET_IMAGE_FAIL:
      return{
        ...state,
        errors: payload,
        isLoading: false,
        serverMessage: payload
      }
      case actionTypes.GET_USER:
        return{
          ...state,
          isLoading: false,
          user: payload.data.data.foundUser
        }
      case actionTypes.GET_USER_FAIL:
        return{
          ...state,
          errors: payload,
          isLoading: false,
          serverMessage: payload
        }
      default: 
        return state;
  }
}

export default imageReducer