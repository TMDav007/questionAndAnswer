import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from './../src/history';

export let  HomePageBody =(props) =>{
    const { currentUser } = props
    useEffect( ()=> {
      currentUser? history.push("/dashboard") : ""
    }, [])
    return (
      <div id="showcase" className="grid">
          <div id="bg-image"></div>
          <div className="content-wrap words">
            <div id="question_answer">
                <h1>Question&Answer</h1>
                <p>Get answers to your questions</p>
                <div id="get_started">
                  <Link to ="/signup"> Get Started </Link>
                  <Link to ="/login"> login </Link>                
                </div>
            </div>
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
  currentUser: state.auth.user.user_name
})


HomePageBody = connect(mapStateToProps,null)(HomePageBody);
