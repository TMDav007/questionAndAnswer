
import utilsReducer from './utlisReducer'
import signupReducers from './signupReducers'
import loginReducer from './loginReducer';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  utils: utilsReducer,
  auth: authReducer,
  signup: signupReducers,
  login: loginReducer,
  questions: questionsReducer
})


export default rootReducer;