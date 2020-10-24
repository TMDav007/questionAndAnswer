
import React, { Component,useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllQuestions, removeMessage, askQuestion } from './../redux/actions'
import formValidation from "./formValidation";
import validateAuth from "./validateAuth";

const todaysDate = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1
  let year = today.getFullYear();

  if (today < 10){
    day = `0 ${day}`;
  }
  if (month < 10){
   month = `0 ${month}`;
 }

 today = `${year}-${month}-${day}`;
 return today;
}

const currentDate = todaysDate();

const INITIAL_STATE = {
  question: "",
  date: ""
}

export let Dashboardbody = (props) => {
  const { message, removeMessage, allQuestions,getAllQuestions, askQuestion,isLoading} = props;
  const { handleChange, handleBlur,handleSubmit, errors, values} = formValidation(INITIAL_STATE, validateAuth);
  useEffect( ()=> {
    getAllQuestions();
  }, [])

  const onSubmitQuestion = () => {
    handleSubmit.call(this, event);
    console.log(errors);
    const noErrors = Object.keys(errors).length === 0;
    values.date= todaysDate();
   // console.log(values, "va;ue")
    if (noErrors){
      askQuestion(values);
      window.location.reload();
    }
   // 
  
  }
    return (
      <div className="container">
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
              <form onSubmit={onSubmitQuestion}>
                <div className="question">
                  <input 
                  type="text" 
                  name="question"
                  value={values.question}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  id="ask" 
                  placeholder="ask your question" />
                  {errors.question && <span className='error-text'>{errors.question} </span>}
                </div>
                <button disabled={isLoading} type="submit" id="submit_ask">Ask </button>
              </form>
            </div>
            <div className="question">
                {
              allQuestions.map((question, key) => {
               return <div className="questions" key={key}> 
                  <div className="profile_img_section">
                  <img src="" alt={question.username} className="profile_img" />
                  </div>
                  <div className="questions_section">
                    <h4 className="username">{question.user_name}</h4>
                    <p>{question.question}</p>

                  <div className="icons">
                    <Link to="/comment"><i className="fa fa-comment-o comment" aria-hidden="true"></i></Link>
                    <i className="fa fa-heart like"  aria-hidden="true"></i>
                  </div> 
                  </div>
                  <div className="menu_section">
                  <i className="fa fa-sort-desc menu_icon"  aria-hidden="true"></i>
                  </div> 
                </div>
              })}
            </div>
            <div className="question-buttons"></div>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => ({
  message: state.questions.serverMessage,
  allQuestions: state.questions.allQuestions,
  isLoading: state.questions.isLoading
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    removeMessage: () => dispatch(removeMessage()),
    askQuestion: (value) => dispatch(askQuestion(value))
  }
}


 Dashboardbody = connect(mapStateToProps, mapDispatchToProps)(Dashboardbody);
 