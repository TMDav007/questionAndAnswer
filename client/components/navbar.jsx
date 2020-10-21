import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../redux/actions'

export class navbar extends Component {

  state = {
    isCollapsed: false
  }
 render() {
  const isMenu = this.state.isCollapsed;
  const { authenticated, logout } = this.props;

  const userLinks = (
    <nav>
        <div className="menu-bar"><Link to ="/"> <h1>Q&A</h1></Link>
          <div className="links">
            <Link to ="/dashboard"> Home </Link>
            <Link to ="/questions"> Questions</Link>
            <Link to ="/profile"> Profile</Link>
            <Link to ="/login" id="log-out" onClick={ () => logout()}> Log out</Link>
        </div>
          <i className={isMenu ? "material-icons close" : "material-icons menu"} onClick={ () => this.setState({isCollapsed: !isMenu})}>{isMenu ? 'close' : 'menu'}</i>
      </div>
      <div className={isMenu ? "dropdown" : " "}>
          <Link to ="/dashboard"> {isMenu ?'home': ''}</Link>
          <Link to ="/questions"> {isMenu ? 'questions' : ''}</Link>
          <Link to ="/profile"> {isMenu ? 'profile' : ''}</Link>
          <Link to ="/login" onClick={ () => logout()}> {isMenu ? 'log out' : ''}</Link>
      </div>
    </nav>
  )

  const guestLinks = (
    <nav>
      <div className="menu-bar"><Link to ="/"> <h1>Q&A</h1></Link>
        <div className="links">
          <Link to ="/login"> login </Link>
          <Link to ="/signup"> signup </Link>
       </div>
        <i className={isMenu ? "material-icons close" : "material-icons menu"} onClick={ () => this.setState({isCollapsed: !isMenu})}>{isMenu ? 'close' : 'menu'}</i>
     </div>
    <div className={isMenu ? "dropdown" : " "}>
        <Link to ="/login"> {isMenu ?'login': ''}</Link>
        <Link to ="/signup"> {isMenu ? 'sign up' : ''}</Link>
    </div>
  </nav>
  );

 
    return (
      <div>
          <header>
            {authenticated ? userLinks: guestLinks }
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
