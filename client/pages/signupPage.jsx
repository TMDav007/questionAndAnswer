import React, { Component } from 'react'

import NavBar from './../components/navbar';
import SignupForm from './../components/signup';
import Footer from './../components/footer';


export class signupPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <SignupForm />
        <Footer />
      </div>
    )
  }
}

export default signupPage
