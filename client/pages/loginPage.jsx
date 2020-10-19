import React, { Component } from 'react'
import { connect } from 'react-redux';

import NavBar from './../components/navbar';
import LoginForm from './../components/login';
import Footer from './../components/footer';
import { loginUser, removeMessage } from './../redux/actions'

class loginPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <LoginForm props={this.props}/>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  message: state.login.serverMessage,
  isLoading: state.login.isLoading
})

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (value) => dispatch(loginUser(value)),
    removeMessage: () => dispatch(removeMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(loginPage);

//export default loginPage
