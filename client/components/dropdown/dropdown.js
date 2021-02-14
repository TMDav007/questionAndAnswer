import React, { useState,useEffect, useRef, useCallback } from 'react';
import  { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import './style.scss';
import { QuestionDropdown } from './questionDropdown';

import { getAllQuestions, showModal, isEdit, deleteAQuestion } from './../../redux/actions'

let elemId;
export const ModalQuestion = (props) => {
  const {setIsOpen, handleBlur, handleChange, isLoading, onSubmitQuestion, values,errors,submitType, onSubmitEdit} = props;
 
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
      <form id="ask_question_content" onSubmit={submitType === "Ask" ? onSubmitQuestion : onSubmitEdit}>
        <span className="close" onClick={() => setIsOpen(false)}>&times; </span>
        <fieldset>
          <legend>
            <h1>{submitType} Question</h1>
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
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Question details..."/>
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
   const {showModal, show, allQuestions, isEdit} = props;
   const {setIsOpen, handleBlur, handleChange, isLoading, values, errors,setOpenDeleteModal} = props.props
    
  const [open, isOpen] = useState(false);

   const editQuestionClick = (id) => {
    const question = allQuestions.filter(question => question.id === id)
    values.question = question[0].question;
    values.id = id;
    values.date = question[0].date.slice(0, 10)
    setIsOpen(true);

    <ModalQuestion setIsOpen={setIsOpen} handleBlur={handleBlur} handleChange={handleChange} isLoading={isLoading} values={values} />
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
   elemId = props.id;
  return  (
    <div className="dropdown">
      <ul className="menu-item">
        <li id={props.id} onClick={()=>{
          isEdit() 
          editQuestionClick(props.id)}}><a>Edit</a></li>
        <li><a>Vote</a></li>
        <li onClick={()=> showDeleteModal()}><a>Delete</a></li>
      </ul>
    </div>  
  )

}



export let DeleteQuestion = (props) => {
  console.log(props);
  const {setOpenDeleteModal, deleteAQuestion} = props;

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

  const deleteItem =(element) => {
    deleteAQuestion(element);
    window.location.reload();
  }
  return (
    <div className="modal_delete" ref={modalRef} onClick={closeModal}>
      <div id="delete_content">
        <div id = ""> 
            <div id="delete_head">
            <span id="delete_title"> Delete Video  </span>
            <span className="close" onClick={() => setOpenDeleteModal(false)}>&times; </span>
            </div>
           
            <h3>Do you want to delete this question?</h3>
        </div>
        <div id="delete_btn">
         <button onClick={() =>setOpenDeleteModal(false)} id="left">Cancel</button>
         <button onClick={()=> deleteItem(elemId)} id="right">Yes</button>
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
    deleteAQuestion: (element) => dispatch(deleteAQuestion(element))
  }
}
DropdownMenu = connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);

DeleteQuestion = connect(mapStateToProps, mapDispatchToProps)(DeleteQuestion);