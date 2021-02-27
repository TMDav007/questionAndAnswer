import * as actionTypes from '../actionTypes';
import initialState from './../state';

const commentsReducer = (state=initialState, action) => {
  const {type, payload} = action;
    switch(type){
      case actionTypes.COMMENT:
        return {
          ...state,
          isLoading: false
        }
      case actionTypes.COMMENT_FAIL:
        return {
          ...state,
          comments: [],
          isLoading: false,
          errors: payload,
          serverMessage: payload
        }
      case actionTypes.GET_COMMENTS:
        return {
          ...state,
          isLoading: false,
          comments: payload
        }
      case actionTypes.GET_COMMENTS_FAIL:
        return {
          ...state,
          errors:payload,
          comments: [],
          isLoading: false,
          serverMessage: payload
        }
      
        default: return state;
    }
    
}

export default commentsReducer