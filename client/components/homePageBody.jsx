import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                  <Link to ="/signup"> Get Started </Link>
                  <Link to ="/login"> login </Link>                
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default homePageBody
