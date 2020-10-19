import { createStore, applyMiddleware } from 'redux';
import signupReducers from './reducers/signupReducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './reducers/index'

const middleware = [thunk];

const initialState = {};

const store = createStore(
  rootReducers ,
  composeWithDevTools(applyMiddleware(...middleware))

);

export default store;