
import utilsReducer from './utlisReducer'
import signupReducers from './signupReducers'
import loginReducer from './loginReducer'
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  utils: utilsReducer,
  signup: signupReducers,
  login: loginReducer
})


export default rootReducer;