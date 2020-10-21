import React, { Component } from 'react'

export class profileBody extends Component {
  render() {
    return (
      <div className="container">
        <div id="user-background-image"></div>
        <div className="main-content">
          <div id="sidebar_space"></div>
          <div id="content_space">
            <div id="profile_image"> 
              <div className="profile_image_section">
              <img src="" alt="" className="profile_image" />
              <i className="fa fa-camera" id="profile_image_icon" aria-hidden="true"></i>
              </div>
            </div>

            <div id="profile_form">
              <form action="login.html">
                <label htmlFor="username"> </label>
                <input type="text" name="username" id="username" placeholder="Username@2020" disabled />
                <i className="fa fa-pencil-square-o" id="form_icon" aria-hidden="true"></i>
                <br/>
                <br/>
                <label htmlFor="password"></label>
                <input type="text" name="email" id="email" placeholder="yourmail@yahoo.com" disabled />
                <i className="fa fa-pencil-square-o" id="form_icon" aria-hidden="true"></i>
                <br/>
                <br/>
                <label htmlFor="phone no"></label>
                <input type="number" name="phone_no" id="phone_no" placeholder="09086573458" disabled />
                <i className="fa fa-pencil-square-o" id="form_icon" aria-hidden="true"></i>
                <br/>
                <br/>
                <button type="submit" id="submit" >Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
     </div>
    )
  }
}

export default profileBody;
