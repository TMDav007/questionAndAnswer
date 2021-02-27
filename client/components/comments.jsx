import React, {useEffect, useState, useRef, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import formValidation from './formValidation';
import validateAuth from './validateAuth';
import comment from '../pages/commentPage';
import { getComments, commentx , editComment} from './../redux/actions/actionComment';
import {DropdownMenu, ModalQuestion, DeleteQuestion} from './dropdown/dropdown'
import Spinners from './../components/spinner/spinner.component';
import {GenericCommentPage} from './pageComponent/genericPage'
import { navbar } from './navbar';

const INITIAL_STATE = {
  comment: "",
  questionId: "",
  likes: "no"
}
let commentBox ;
export let Comments = (props) => {
  const {handleChange, handleBlur, handleSubmit, errors, values} = formValidation(INITIAL_STATE, validateAuth);
  const { isLoading, commentx, getComments, allComments, currentUser, editComment} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const question = JSON.parse(localStorage.getItem('data'));

  useEffect( ()=> {
    getComments(question.id)
  }, [])

  const onSubmitComment = () => {
    handleSubmit.call(this,event)
    values.questionId = question.id;
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors){
     commentx(values);
      getComments(values.questionId);
      window.location.reload();
    }
  }

  const onSubmitEditComment = () => {
    handleSubmit.call(this, event);
    const noErrors = Object.keys(errors).length === 0;
    values.comment = values.question;
    console.log(values)
    if (noErrors) {
      editComment(values);
      getComments(values.questionId);
      window.location.reload();
    }
    
  }
const modalRef = useRef();
commentBox = modalRef.current;
    return (
      <>
      <div className="containa">
        <div id="user-background-image"></div>
        {isLoading ? <Spinners /> : null}
        <div className="main-content">
          <div id="sidebar_space"></div>
          <div id="content_space">
            <div id="ask_question">
              <p>{question.question}
              </p>
            </div>

            {isOpen ? <ModalQuestion setIsOpen={setIsOpen} handleBlur={handleBlur} handleChange={handleChange} isLoading={isLoading} 
            onSubmitEditComment={onSubmitEditComment} values={values} errors={errors} submitType={""} /> : ""}

            <div className="question">
              {
                <GenericCommentPage dataArray={allComments} dataClassName="questions" currentUser={currentUser} values={values} handleBlur={handleBlur} handleChange={handleChange} isLoading={isLoading} setIsOpen={setIsOpen}values={values} questionId={question.id} setOpenDeleteModal={setOpenDeleteModal} />
              }
            </div>
            { openDeleteModal? <DeleteQuestion setOpenDeleteModal={setOpenDeleteModal} type={"Comment"} /> : ""}

            <div className="question-buttons"></div>
          </div>
        </div>
      </div>
      {!isOpen ? <div className="comment_box" ref={modalRef}>
        <section id="comment_section">
          <form id="comment_form" onSubmit={onSubmitComment}>
            <div><input 
            name="comment"
            type="text"
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Comment details..."/>
            {errors.comment && <span style={{bottom:"1px"}}className='error-text'>{errors.comment}</span>}
            </div>
            <div>
               <button disabled={isLoading} type="submit" id="">Submit</button>
            </div>
          </form>
        </section>
      </div> : ""}

      </>
    )
}

let lastScrollTop = 0;

//hide and show comment
console.log(commentBox)
commentBox? 
(window.addEventListener("scroll", ()=> {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      commentBox.style.display = "none";
    } else {
      commentBox.style.display = 'block';
    }
    lastScrollTop = scrollTop
}) ): ""


const mapStateToProps = (state) => ({
    question: state.questions.question,
    isLoading: state.comments.isLoading,
    allComments: state.comments.comments,
    currentUser: state.auth.user.user_name
})

const mapDispatchToProps = (dispatch) => {
  return {
    commentx: (value) => dispatch(commentx(value)),
    getComments: (questionId) => dispatch(getComments(questionId)),
    editComment: (value) => dispatch(editComment(value))
  }
}

Comments = connect(mapStateToProps, mapDispatchToProps)(Comments)




/*
                allComments && allComments.sort((a, b) => parseFloat(a.id)- parseFloat(b.id)).map((coment, key) => {
                   return <div className="questions" key={coment.id}> 
                      <div className="profile_img_section"> <img src="" className="profile_img" /> 
                      </div>
                      <div className="questions_section">
                        <h4 className="username">{coment.user_name}</h4>
                        <p>{coment.comment}</p>
                        <div className="icons">
                          <Link to=""><i className="fa fa-comment-o comment" aria-hidden="true"></i></Link>
                          <i className="fa fa-heart like" aria-hidden="true"></i>
                        </div>
                      </div>

                      <div className="menu_section">
                        <i className="fa fa-sort-desc menu_icon" aria-hidden="true">
                        </i>
                      </div>
                  </div>
                })
*/