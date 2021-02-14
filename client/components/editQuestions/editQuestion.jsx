import React from 'react';
import './style.scss';
import {connect} from 'react-redux';

export let EditQuestion = (props) => {

  const { getAllQuestions } = props;
  useEffect( ()=> {
    getAllQuestions();
  }, [])

  /* return (
    <div id="showcase">
      <div id='bg-image'></div>
      <div className=''>
        <div id='get_started'>
          <h1>Edit Question</h1>
          <form onSubmit={submit}>
            <div className= 'edit_question'>
              <label htmlFor='edit_question'></label>
              <input 
                className=""
                placeholder=""
                text='text'
                name="username"
                value=""
                formNoValidate
                onBlur=""
                
                />
            </div>
            <div className="login">
              <button type="submit" id='submit'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) */
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions())
  }
}

EditQuestion = connect(mapStateToProps, mapDispatchToProps)(EditQuestion);
