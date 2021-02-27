import * as actionTypes from './../actionTypes';

const loaderReducer = (state= false, action) => {
  switch(action.type) {
    case actionTypes.TOGGLE_LOADER:
      return !state;
    default:
      return state;
  }
}

export default loaderReducer;