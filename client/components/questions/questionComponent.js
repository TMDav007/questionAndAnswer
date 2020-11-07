import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllQuestions, removeMessage, askQuestion } from './../../redux/actions';
import { DropdownMenu } from './../dropdown/dropdown'
import './../dropdown/style.scss';

export let QuestionComponent = (props) => {
  const { message, removeMessage, allQuestions,getAllQuestions, askQuestion,isLoading} = props;
  const [open, setOpen] = useState(false);
  const [element, setElement] = useState(null)
  let id;
  const inputRef = useRef();
  id = {
     display: 'block'
  }
  if (open){
    id= "menu-item1";
  }
  useEffect( ()=> {
    getAllQuestions();
  }, [])

  return (
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
      <div className="menu_section" >
      /** this is the section */ 
  <i className="fa fa-sort-desc menu_icon"  aria-hidden="true" key={key} id={key} ref={inputRef} onClick={(e) =>setOpen(!open) }> {open? <div className="dropdown">
    <ul key={key} id='menu-item1' >
    <li>Edit</li>
    <li>Vote</li>
    <li>Delete</li>
    </ul>
</div> : "" }
</i>
      </div> 
    </div>
  })}
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

QuestionComponent = connect(mapStateToProps,mapDispatchToProps)(QuestionComponent)
