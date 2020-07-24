import React, { Component } from 'react'

export class login extends Component {
  render() {
    return (
      <div id='showcase'>
        <div id='bg-image'></div>
        <div className='content-wrap words'>
          <div id='question_answer'>
            <div id='get_started'>
              <h1>QuestionAnswer</h1>
              <p>Get answers to your questions</p>
              <form action=''>
                <div className= 'username'>
                  <label htmlFor='username'></label>
                  <input 
                    className=''
                    placeholder='Username'
                    type='text'
                    name='username'
                    formNoValidate
                    onChange={this.handleChange}
                    />
                </div>
                <div className= 'password'>
                  <label htmlFor='password'></label>
                  <input 
                    className=''
                    placeholder='Password'
                    type='password'
                    name='password'
                    formNoValidate
                    onChange={this.handleChange}
                    />
                </div>
                <div className="login">
                  <button type='submit' id='submit'>Log in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default login
