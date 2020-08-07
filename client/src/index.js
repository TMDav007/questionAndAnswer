import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import '@babel/polyfill';
import "./styles/app.scss";

//Pages
import HomePage from './../pages/homepage';
import LoginPage from './../pages/loginPage';
import SignupPage from './../pages/signupPage';
import NotFoundPage from './../pages/notFoundPage';
import history from './history';

class Main extends React.Component {
    render() {
        return (
          <Router history={history}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/signup' component={SignupPage} />
              <Route exact path='/404' component={NotFoundPage} />
              <Redirect to='/404' />
            </Switch>
          </Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
