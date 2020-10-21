import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class QuestionsBody extends Component {
  render() {
    return (
      <div className="container">
        <div id="user-background-image"></div>
        <div className="main-content">
          <div className="question">
            <input type="text" name="username" id="ask" placeholder=" ask your question" />
            <button type="submit" id="submit_ask">Ask
            </button>
            <div className="menu_section">
              <img src="" alt="" className="menu_icon" />
            </div>
            <div className="dropdown">
              <ul>
              <Link to=""></Link>
                <li><Link to="">edit</Link></li>
                <li><Link to="">vote</Link></li>
                <li><Link to="">delete</Link></li>
              </ul>
            </div>
        
          </div>
          <div className="question-buttons"></div>
        </div>
    </div>
    )
  }
}