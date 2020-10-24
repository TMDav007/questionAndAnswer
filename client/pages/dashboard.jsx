import React, { Component } from 'react'

import NavBar from './../components/navbar';
import {Dashboardbody}  from './../components/dashboardbody';
import Footer from './../components/footer';

export class dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Dashboardbody />
        <Footer />
      </div>
    )
  }
}

export default dashboard
