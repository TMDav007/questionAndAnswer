import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class navbar extends Component {

  state = {
    isCollapsed: false
  }

  render() {
    const isMenu = this.state.isCollapsed;
    return (
      <div>
          <header>
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
          </header>
      </div>
    )
  }
}

export default navbar
