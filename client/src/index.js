import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import jwt from 'jsonwebtoken';

import '@babel/polyfill';
import "./styles/app.scss";

//Pages
import HomePage from './../pages/homepage';
import LoginPage from './../pages/loginPage';
import SignupPage from './../pages/signupPage';
import NotFoundPage from './../pages/notFoundPage';
import Dashboard from './../pages/dashboard';
import Profile from './../pages/profile';
import AllQuestions from './../pages/allQuestion';
import EditQuestion from './../pages/editQuestion';


import { ProtectedRoute } from './../components/protectedRoute';
import history from './history';
import setAuthorizationToken from './../redux/utils';
import { setCurrentUser } from './../redux/actions'

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

class Main extends React.Component {
    render() {
        return (
          <Router history={history}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login' component={LoginPage} />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              <ProtectedRoute exact path='/edit' component={EditQuestion} />
              <ProtectedRoute exact path='/profile' component={Profile} />
              <ProtectedRoute exact path='/questions' component={AllQuestions} />
              <Route exact path='/signup' component={SignupPage} />
              <Route exact path='/404' component={NotFoundPage} />
              <Redirect to='/404' />
            </Switch>
          </Router>
        );
    }
}

ReactDOM.render(
  <Provider store={store}>
      <Main />
  </Provider>,
  document.getElementById('root'));
