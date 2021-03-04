import React, { useState,useEffect, useRef, useCallback } from 'react';
import  { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './style.scss';

import { getAllQuestions, showModal, isEdit, deleteAQuestion } from './../../redux/actions'
import {deleteAComment} from './../../redux/actions/actionComment';
import Spinners from './../spinner/spinner.component'

let elemObj= {};
export const ModalQuestion = (props) => {
  const {setIsOpen, handleBlur, handleChange, isLoading, onSubmitQuestion, values,errors,submitType, onSubmitEdit, onSubmitEditComment} = props;
 
  const submitCategory = (event) => {
    event.preventDefault()
    if(submitType) {
     const summitType= submitType === "Ask" ? onSubmitQuestion() : onSubmitEdit();
    return summitType;
    }
   return onSubmitEditComment();
  }
 const  modalRef = useRef();
  const closeModal = (event => {
    if(modalRef.current === event.target){
      setIsOpen(false)
    }
    })

  const keyPress = useCallback( event => {
    if(event.key === "Escape" && setIsOpen){
      setIsOpen(false)
    }
  }, [setIsOpen])

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return ()=> document.removeEventListener('keydown', keyPress);
    }, [keyPress]
  )

  return ( 
    <div id="modal_ask_question" ref={modalRef}onClick = {closeModal}>
      <form id="ask_question_content" onSubmit={submitCategory} >
      {isLoading ? <Spinners /> : null}
        <span className="close" onClick={() => setIsOpen(false)}>&times; </span>
        <fieldset>
          <legend>
            {submitType && <h1>{submitType} Question</h1> }
            {!submitType && <h1>Edit Comment</h1>}
          </legend>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td> </td>
                <td>
                  <textarea 
                  rows={4} 
                  colSpan={50}
                  name="question"
                  value={values.question || values.comment}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Question details..."/>
                  <br/>
                  {errors.question && <span style={{bottom:"1px"}}className='error-text'>{errors.question}</span>}
                  <br />
                  <br />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button disabled={isLoading} type="submit" id="">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
  </div>
  )
}


const DropdownApp = () => {
  return (
    <Navbar>
      <NavItem icon="smiley" />
      <NavItem icon="smiley" />
      <NavItem icon="smiley" />

      <NavItem icon="smiley">

        { /* Dropdown goes here*/}
        
      </NavItem>
    </Navbar>
  );
}



export let DropdownMenu = (props) => {
   const {showModal, show, allQuestions, isEdit, data, setIsOpen, handleBlur, handleChange, isLoading, values, errors, setOpenDeleteModal, questionId} = props;
    
  const [open, isOpen] = useState(false);

  const getEditData = (dat, val) => {
    dat.question ? val.question = dat.question : "";
    dat.date? val.date = dat.date.slice(0, 10) : "";
    dat.id? val.id = dat.id: "";
    dat.comment ? val.comment = dat.comment : "";
    questionId? val.questionId = questionId : "";
    return val
   }

  const editQuestionClick = (data, values) => {
    const valuez = getEditData(data, values)
    setIsOpen(true);
  <ModalQuestion setIsOpen={setIsOpen} handleBlur={handleBlur} handleChange={handleChange} isLoading={isLoading} values={valuez} />
  } 

  const showDeleteModal = () => {
      setOpenDeleteModal(true)
  }

   const DropdownItem = (props) => {
      return (
        <li><a className="">
          {props.children}
        </a></li>
      )
   }
   elemObj.id = props.id;
   elemObj.questId= props.questionId
  return  (
    <div className="dropdown">
      <ul className="menu-item">
        <li id={props.id} onClick={()=>{
          isEdit() 
          editQuestionClick(data,props.values)}}><a>Edit</a></li>
        <li><a>Vote</a></li>
        <li onClick={()=> showDeleteModal()}><a>Delete</a></li>
      </ul>
    </div>  
  )

}


export let DeleteQuestion = (props) => {
  const {setOpenDeleteModal, deleteAQuestion,deleteAComment, type, isLoading} = props;
  const  modalRef = useRef();
  const closeModal = (event => {
    if(modalRef.current === event.target){
      setOpenDeleteModal(false)
    }
    })
   
  const keyPress = useCallback( event => {
    if(event.key === "Escape" && setOpenDeleteModal){
      setOpenDeleteModal(false)
    }
  }, [setOpenDeleteModal])

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return ()=> document.removeEventListener('keydown', keyPress);
    }, [keyPress]
  )

  const deleteItem =(element, type) => {
  type === "Question" ? deleteAQuestion(element.id) : deleteAComment(element)
   isLoading ? "": location.reload(true);
  }

  return (
    <div className="modal_delete" ref={modalRef} onClick={closeModal}>
      <div id="delete_content">
        <div id = ""> 
        {isLoading ? <Spinners /> : null}
            <div id="delete_head">
            <span id="delete_title"> Delete {type}  </span>
            <span className="close" onClick={() => setOpenDeleteModal(false)}>&times; </span>
            </div>
           
            <h3>Do you want to delete this question?</h3>
        </div>
        <div id="delete_btn">
         <button onClick={() =>setOpenDeleteModal(false)} id="left">Cancel</button>
         <button onClick={()=> deleteItem(elemObj, type)} id="right">Yes</button>
        </div>
      </div>
    </div>
  );
}

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> {props.children} </ul>
    </nav>
  );
}


const NavItem = (props) => {

  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      
      {open && props.children }
    </li>
  );
}

const mapStateToProps = (state) => ({
  show: state.questions.show,
  allQuestions: state.questions.allQuestions
})

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => dispatch(showModal()),
    isEdit: () => dispatch(isEdit()),
    deleteAQuestion: (element) => dispatch(deleteAQuestion(element)),
    deleteAComment: (element) => dispatch(deleteAComment(element))
  }
}
DropdownMenu = connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);

DeleteQuestion = connect(mapStateToProps, mapDispatchToProps)(DeleteQuestion);