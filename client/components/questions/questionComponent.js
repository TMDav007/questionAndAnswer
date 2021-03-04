import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllQuestions, removeMessage, askQuestion, getAQuestion } from './../../redux/actions';
import {getImage } from './../../redux/actions/actionImage'
import { DropdownMenu, DeleteQuestion } from './../dropdown/dropdown'
import { Comments } from './../comments';
import CarretLink from './../carretLink/carret'
import './../dropdown/style.scss';

export let QuestionComponent = (props) => {
  const { message, removeMessage, allQuestions,getAllQuestions, currentUser,askQuestion,isLoading, getAQuestion, getImage, image} = props;
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
    allQuestions &&  allQuestions.sort((a, b) => parseFloat(a.id)- parseFloat(b.id)).map((question, key) => {
      return <div className="questions" key={question.id}>
        <div className="profile_img_section">
          <img src="" alt={question.username} className="profile_img" />
        </div>
        <div className="questions_section">
          <h4 className="username">{question.user_name}</h4>
          <p>{question.question}</p>
          <div className="icons">
            <Link onClick={()=> getAQuestion(question) } to="/comment"><i className="fa fa-comment-o comment" aria-hidden="true"><span style={{fontSize: "11px", marginLeft: "3px"}}>{question.no_of_answers}</span></i></Link>

          </div>
        </div>

        <div className="menu_section">
          {(currentUser === question.user_name) ?
            <i className="fa fa-sort-desc menu_icon" aria-hidden="true" onClick={genToggleFn(question.id)}> {open[question.id] ? 
            <DropdownMenu id={question.id} user={userDropdown} values={props.values} setIsOpen={props.setIsOpen} handleBlur={props.handleBlur} handleChange={props.handleChange} isLoading={props.isLoading} values={props.values} errors={props.errors} setOpenDeleteModal={props.setOpenDeleteModal} data={question} props={props} />
             : ""}
            </i> : ""}
    
        </div>
      </div>;
    })}
</div>
  )
}

const mapStateToProps = (state) => ({
  message: state.questions.serverMessage,
  allQuestions: state.questions.allQuestions,
  isLoading: state.questions.isLoading,
  image: state.image.image,
  currentUser: state.auth.user.user_name
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    removeMessage: () => dispatch(removeMessage()),
    getImage: () => dispatch(getImage()),
    askQuestion: (value) => dispatch(askQuestion(value)),
    getAQuestion: (data) => dispatch(getAQuestion(data))
  }
}

QuestionComponent = connect(mapStateToProps,mapDispatchToProps)(QuestionComponent)
