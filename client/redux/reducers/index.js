
import utilsReducer from './utlisReducer'
import signupReducers from './signupReducers'
import loginReducer from './loginReducer';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer';
import loadingReducer from './loaderReducer';
import commentsReducer from './commentsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  utils: utilsReducer,
  auth: authReducer,
  signup: signupReducers,
  login: loginReducer,
  questions: questionsReducer,
  loading: loadingReducer,
  comments: commentsReducer
})


export default rootReducer;