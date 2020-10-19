import React, { Component } from 'react'

import NavBar from './../components/navbar';
import Dashboard from './../components/dashboardbody';
import Footer from './../components/footer';

export class dashboard extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Dashboard />
        <Footer />
      </div>
    )
  }
}

export default dashboard
