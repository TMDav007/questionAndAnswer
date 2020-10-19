import * as actionTypes from '../actionTypes'
import initialState from '../state'

const utilsReducer = (state = initialState, action) => {
  const { type, payload } = action;
    switch(type){
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
      default:
        return state;
    } 
}

export default utilsReducer;