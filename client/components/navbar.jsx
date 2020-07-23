import React, { Component } from 'react'

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
                  <div className="menu-bar"><h1><a href="index.html">Q&A</a></h1>
                  <div className="links">
                    <a href="login.html">login</a>
                    <a href="signup.html">sign up</a>
                </div>
    <i className={isMenu ? "material-icons close" : "material-icons menu"} onClick={ () => this.setState({isCollapsed: !isMenu})}>{isMenu ? 'close' : 'menu'}</i>
              </div>
              <div className={isMenu ? "dropdown" : " "}>
                  <a href="login.html">{isMenu ?'login': ''}</a>
                  <a href="signup.html">{isMenu ? 'sign up' : ''}</a>
              </div>
              </nav>
          </header>
      </div>
    )
  }
}

export default navbar
