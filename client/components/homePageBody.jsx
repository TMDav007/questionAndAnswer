import React, { Component } from 'react'

export class homePageBody extends Component {
  render() {
    return (
      <div id="showcase" className="grid">
          <div id="bg-image"></div>
          <div className="content-wrap words">
            <div id="question_answer">
                <h1>Question&Answer</h1>
                <p>Get answers to your questions</p>
                <div id="get_started">
                    <a href="signup.html">Get Started</a>
                    <a href="login.html">Login</a>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default homePageBody
