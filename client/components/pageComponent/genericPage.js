import React, {useEffect, useState, useRef, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {DropdownMenu} from './../dropdown/dropdown'
import Spinners from './../spinner/spinner.component';

export const GenericCommentPage = ({
  dataArray ,
  dataClassName,
  currentUser,
  values,
  setIsOpen,
  handleBlur,
  handleChange,
  isLoading,
  questionId,
  setOpenDeleteModal
}) => {
  const [open, setOpen] = useState({});

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
    dataArray && dataArray.sort((a,b) => parseFloat(a.id)-parseFloat(b.id)).map((data, key) => {
     return <div className={dataClassName} key={data.id}>
        <div 
        className="profile_img_section">
          <img src="" className="profile_img" /> 
        </div>
        <div className="questions_section">
            <h4 className="username">{data.user_name}</h4>
            <p>{data.comment || data.question}</p>
            <div className="icons">
            
            </div>
        </div>

        <div className="menu_section">
          {(currentUser === data.user_name) ? 
          <i className="fa fa-sort-desc menu_icon" aria-hidden="true" onClick={genToggleFn(data.id)}>{open[data.id] ? <DropdownMenu id={data.id} data={data} setIsOpen={setIsOpen} handleBlur={handleBlur} handleChange={handleChange} isLoading={isLoading} values={values} questionId={questionId} setOpenDeleteModal={setOpenDeleteModal} /> : ""}</i>
           : "" }
          
        </div>
      </div>
    })
  )
}
