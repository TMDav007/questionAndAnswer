import React, { Component } from 'react'

import Navbar from './../components/navbar';
import { HomePageBody } from './../components/homePageBody';
import Footer from './../components/footer'
export class homepage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <HomePageBody />
        <Footer />
      </div>
    )
  }
}

export default homepage
