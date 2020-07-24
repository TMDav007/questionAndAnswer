import React, { Component } from 'react'

import NavBar from './../components/navbar';
import LoginForm from './../components/login';
import Footer from './../components/footer';

export class loginPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <LoginForm />
        <Footer />
      </div>
    )
  }
}

export default loginPage
