import React, { Component } from 'react';
import NavBar from './../components/navbar';
import {Comments} from './../components/comments';

export class comment extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Comments />
      </div>
    )
  }
}

export default comment