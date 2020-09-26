import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import Navbar from './../components/navbar';
import HomePageBody from './../components/homePageBody';
import Footer from './../components/footer'
import "./notfound.scss";
export class homepage extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="content">
            <h1>404</h1>
              <h3>something's missing</h3>
              <h5>The link or page you are looking for is not found!</h5>
              <Link to ="/"> <p><span id="arrow">&#8592;</span>    Back to the Homepage</p> </Link>
        </div>
        <Footer />
      </div>
    )
  }
}

export default homepage
