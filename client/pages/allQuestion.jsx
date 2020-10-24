import React, { Component } from 'react'

import NavBar from './../components/navbar';
import {AllQuestionsBody} from './../components/allQuestions';
import Footer from './../components/footer';

export class allQuestions extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <AllQuestionsBody />
        <Footer />
      </div>
    )
  }
}

export default allQuestions;
