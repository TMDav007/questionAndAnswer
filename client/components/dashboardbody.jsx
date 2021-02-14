import React, { Component,useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllQuestions, removeMessage, askQuestion, isAsk, editQuestion } from './../redux/actions'
import { DropdownMenu, ModalQuestion, DeleteQuestion} from './../components/dropdown/dropdown'
import { QuestionDropdown} from './../components/dropdown/questionDropdown'
import formValidation from "./formValidation";
import validateAuth from "./validateAuth";

import { QuestionComponent } from './questions/questionComponent';

const todaysDate = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1
  let year = today.getFullYear();

  if (today < 10){
    day = `0 ${day}`;
  }
  if (month < 10){
   month = `0${month}`;
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
  const { message, removeMessage, allQuestions,getAllQuestions, askQuestion,isLoading, isAsk, submitType, editQuestion} = props;
  const { handleChange, handleBlur,handleSubmit, errors, values} = formValidation(INITIAL_STATE, validateAuth);
  useEffect( ()=> {
    getAllQuestions();
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  
  const onSubmitQuestion = () => {
    handleSubmit.call(this, event);
    const noErrors = Object.keys(errors).length === 0;
    values.date= todaysDate();
    if (noErrors){
      askQuestion(values);
      window.location.reload();
    } 
  }

  const onSubmitEdit = () => {  
   handleSubmit.call(this, event);
    console.log(errors);
    console.log(values, "here")
    const noErrors = Object.keys(errors).length === 0;
   
    if (noErrors){
      editQuestion(values);
      window.location.reload();
    } 
  }
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
              <button onClick={() => {
                 isAsk()
                setIsOpen(true)
               }
                } type="submit" id="submit_ask">Ask </button>
            </div>  
            {isOpen ? <ModalQuestion setIsOpen={setIsOpen} handleBlur={handleBlur} handleChange={handleChange} isLoading={isLoading} onSubmitQuestion={onSubmitQuestion} onSubmitEdit={onSubmitEdit} values={values} errors={errors} submitType={submitType} type={"Ask"} /> : ""}
            
            <QuestionComponent setIsOpen={setIsOpen} handleBlur={handleBlur} handleChange={handleChange} isLoading={isLoading} values={values} errors={errors} setOpenDeleteModal={setOpenDeleteModal} />

            { openDeleteModal? <DeleteQuestion setOpenDeleteModal={setOpenDeleteModal} /> : ""}
            <div className="question-buttons"></div>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => ({
  message: state.questions.serverMessage,
  allQuestions: state.questions.allQuestions,
  isLoading: state.questions.isLoading,
  submitType: state.questions.submitType
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    removeMessage: () => dispatch(removeMessage()),
    askQuestion: (value) => dispatch(askQuestion(value)),
    isAsk: () => dispatch(isAsk()),
    editQuestion: (value)=> dispatch(editQuestion(value))
  }
}


 Dashboardbody = connect(mapStateToProps, mapDispatchToProps)(Dashboardbody);
 