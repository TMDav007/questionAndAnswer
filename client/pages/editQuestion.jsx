import React, { Component } from 'react'

import NavBar from './../components/navbar';
import Footer from './../components/footer';
import { EditQuestion } from '../components/editQuestions/editQuestion';

export class editQuestion extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <EditQuestion/>
        <Footer />
      </div>
    )
  }
}

export default editQuestion
