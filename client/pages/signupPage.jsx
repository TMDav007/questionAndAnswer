import React, { Component } from 'react';
import { connect } from "react-redux";

import NavBar from './../components/navbar';
import SignupForm from './../components/signup';
import Footer from './../components/footer';
import Spinners from './../components/spinner/spinner.component';
import { registerUser, removeMessage } from './../redux/actions'


export class signupPage extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <NavBar />
        { isLoading ? <Spinners /> : null }
        <SignupForm props={this.props} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.signup.serverMessage,
  isLoading: state.signup.isLoading,
  currentUser: state.auth.user.user_name
})

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (value) => dispatch(registerUser(value)),
    removeMessage: () => dispatch(removeMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(signupPage)

//export default signupPage
