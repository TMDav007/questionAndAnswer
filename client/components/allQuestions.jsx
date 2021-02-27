import React, { Component,useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import allQuestions from '../pages/allQuestion';

import { getAllMyQuestions, removeMessage } from './../redux/actions'

export let AllQuestionsBody = (props) => {
    const { message, removeMessage,myQuestions, getAllMyQuestions} = props;
    useEffect( ()=> {
      getAllMyQuestions();
    }, [])
    return (
      <div className="containa">
        <div id="user-background-image"></div>
        <div className="main-content">
          <div id="sidebar_space"></div>
          <div id="content_space">
          {message && 
                  <div id='modal_error_display'>
                  <div id='serverMessage'>
                    <span className="popup_close" onClick={() => removeMessage() } >&times;</span>
                    { message }
                  </div>
                </div>}
            <div id="ask_question">
              <h3>My Questions</h3>
            </div>
            <div className="question"> 
            {
              myQuestions.map((question, key) => {
                return <div className="questions" key={question.id}> 
                <div className="profile_img_section">
                <img src="" alt={question.username} className="profile_img" />
                </div>
                <div className="questions_section">
                  <h4 className="username">{question.user_name}</h4>
                  <p>{question.question}</p>

                <div className="icons">
                  <i className="fa fa-comment-o comment" aria-hidden="true"><span style={{fontSize: "11px", marginLeft: "3px"}}>{question.no_of_answers}</span></i>
                </div> 
                </div>
                <div className="menu_section">
                 
                </div> 
              </div>
              })
            }          
            </div>
            <div className="question-buttons"></div>
        </div>
      </div>
    </div>
    )
}

const mapStateToProps = (state) => ({
  message: state.questions.serverMessage,
  isLoading: state.questions.isLoading,
  myQuestions: state.questions.allQuestions
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMyQuestions: () => dispatch(getAllMyQuestions()),
    removeMessage: () => dispatch(removeMessage())
  }
}

AllQuestionsBody = connect(mapStateToProps, mapDispatchToProps)(AllQuestionsBody);

