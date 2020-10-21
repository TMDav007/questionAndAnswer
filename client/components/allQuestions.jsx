import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class allQuestionsBody extends Component {
  render() {
    return (
      <div className="container">
        <div id="user-background-image"></div>
        <div className="main-content">
          <div id="sidebar_space"></div>
          <div id="content_space">
            <div id="ask_question">
              <h3>My Questions</h3>
            </div>
            <div className="question"> 
              <div className="questions">
                <div className="profile_img_section">
                  <img src="" alt="" className="profile_img" />
                </div>
                <div className="questions_section">
                  <h4 className="username">Username</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas
                    nesciunt quidem illo a odit accusantium voluptatem, libero, cum rerum praesentium. Tenetur
                    quis fugiat praesentium voluptas possimus officiis?
                  </p>
                  <div className="icons">
                    <Link to="/comment"><i className="fa fa-comment-o comment" aria-hidden="true"></i></Link>
                    <i className="fa fa-heart like" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="menu_section">
                  <i className="fa fa-sort-desc menu_icon"  aria-hidden="true"></i>
                </div>
              </div>

              <div className="questions">
                <div className="profile_img_section">
                  <img src="" alt="" className="profile_img" />
                </div>
                <div className="questions_section">
                  <h4 className="username">Username</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas
                    nesciunt quidem illo a odit accusantium voluptatem, libero, cum rerum praesentium. Tenetur
                    quis fugiat praesentium voluptas possimus officiis?
                  </p>
                  <div className="icons">
                    <Link to="/comment"><i className="fa fa-comment-o comment" aria-hidden="true"></i></Link>
                    <i className="fa fa-heart like"  aria-hidden="true"></i>
                  </div>
                </div>
                <div className="menu_section">
                  <i className="fa fa-sort-desc menu_icon" aria-hidden="true"></i>
                </div>
              </div>

              <div className="questions">
                <div className="profile_img_section">
                  <img src="" alt="" className="profile_img" />
                </div>
                <div className="questions_section">
                  <h4 className="username">Username</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta corporis alias voluptas
                    nesciunt quidem illo a odit accusantium voluptatem, libero, cum rerum praesentium. Tenetur
                    quis fugiat praesentium voluptas possimus officiis?
                  </p>
                  <div className="icons">
                    <Link to="/comment"><i className="fa fa-comment-o comment" aria-hidden="true"></i></Link>
                    <i className="fa fa-heart like"   aria-hidden="true"></i>
                  </div>
                </div>
                <div className="menu_section">
                  <i className="fa fa-sort-desc menu_icon"  aria-hidden="true"></i>
                </div>
              </div>
                    
            </div>
            <div className="question-buttons"></div>
        </div>
      </div>
    </div>
    )
  }
}

export default allQuestionsBody;