import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../redux/actions'

export class navbar extends Component {

  state = {
    isCollapsed: false
  }
 render() {
  const isMenu = this.state.isCollapsed;
  const { authenticated, logout } = this.props;

  const userNavLinks = (
    <nav>
        <div className="menu-bar" id="menubar"><Link to ="/dashboard"> <h1>Q&A</h1></Link>
          <i className={isMenu ? "material-icons close" : "material-icons menu"} onClick={ () => this.setState({isCollapsed: !isMenu})}>{isMenu ? 'close' : 'menu'}</i>
      </div>
      <div className={isMenu ? "dropdown" : " "}>
          <NavLink to ="/dashboard" activeClassName="active" > {isMenu ?'home': ''}</NavLink>
          <NavLink to ="/questions" activeClassName="active"> {isMenu ? 'questions' : ''}</NavLink>
          <NavLink to ="/profile" activeClassName="active"> {isMenu ? 'profile' : ''}</NavLink>
          <NavLink to ="/login" onClick={ () => logout()}> {isMenu ? 'log out' : ''}</NavLink>
      </div>
      <div className="sidebar">
        <div className="side-link">
          <NavLink to ="/dashboard" activeClassName="active" > {'home'}</NavLink>
          <NavLink to ="/questions" activeClassName="active"> {'questions'}</NavLink>
          <NavLink to ="/profile" activeClassName="active"> {'profile'}</NavLink>
          <NavLink to ="/login" onClick={ () => logout()}> {'log out' }</NavLink>
        </div>

      </div>
    </nav>
  )

  const guestNavLinks = (
    <nav>
      <div className="menu-bar" id="menubar">
        <div><Link to ="/"> 
          <h1>Q&A</h1></Link>
        </div>
       
        <div className="links">
          <NavLink to ="/login" activeClassName="active"> Login </NavLink>
          <NavLink to ="/signup" activeClassName="active"> Signup </NavLink>
       </div>
        <i className={isMenu ? "material-icons close" : "material-icons menu"} onClick={ () => this.setState({isCollapsed: !isMenu})}>{isMenu ? 'close' : 'menu'}</i>
     </div>
    <div className={isMenu ? "dropdown" : " "}>
        <NavLink to ="/login" activeClassName="active"> {isMenu ?'login': ''}</NavLink>
        <NavLink to ="/signup" activeClassName="active"> {isMenu ? 'sign up' : ''}</NavLink>
    </div>
  
  </nav>
  );
 
    return (
      <div>
          <header>
            {authenticated ? userNavLinks: guestNavLinks }
          </header>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(navbar);
