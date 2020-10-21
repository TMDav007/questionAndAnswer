import * as actionTypes from '../actionTypes'
import initialState from './../state';

const authReducer = (state = initialState, action) => {
  const { type,user} = action;
  switch(type){
    case actionTypes.SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: true,
          user
        }
    default:
      return state
 }
}

export default authReducer