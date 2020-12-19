import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllQuestions, removeMessage, askQuestion } from './../../redux/actions';
import { DropdownMenu } from './../dropdown/dropdown'
import CarretLink from './../carretLink/carret'
import './../dropdown/style.scss';

export let QuestionComponent = (props) => {
  const { message, removeMessage, allQuestions,getAllQuestions, currentUser,askQuestion,isLoading} = props;
  const [open, setOpen] = useState({});
  const [element, setElement] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);

  function genToggleFn(index, username, currentUser) {
    return function () {
      Object.keys(open).forEach(function(key){
        if (open[index]){
          return;
        }
        open[key] = false
       }) 
       setOpen({ ...open, [index]: !open[index] })
    }
  }

  return (
    <div className="question" >
    {
    allQuestions.map((question) => {
      
    return <div className="questions" key={question.id}> 
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
      { (currentUser === question.user_name) ?
       <i className="fa fa-sort-desc menu_icon"  aria-hidden="true" onClick={genToggleFn(question.id)
       } > { 
      open[question.id] ? <DropdownMenu id={question.id} user={userDropdown} />: "" }
       </i> : ""
      }
      </div> 
    </div>
  })}
</div>
  )
}

const mapStateToProps = (state) => ({
  message: state.questions.serverMessage,
  allQuestions: state.questions.allQuestions,
  isLoading: state.questions.isLoading,
  currentUser: state.auth.user.user_name
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    removeMessage: () => dispatch(removeMessage()),
    askQuestion: (value) => dispatch(askQuestion(value))
  }
}

QuestionComponent = connect(mapStateToProps,mapDispatchToProps)(QuestionComponent)
