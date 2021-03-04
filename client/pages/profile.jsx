import React, { Component } from 'react'

import NavBar from './../components/navbar';
import { ProfileBody } from './../components/profileBody';
import Footer from './../components/footer';

export class profile extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ProfileBody />
        <Footer />
      </div>
    )
  }
}

export default profile;
