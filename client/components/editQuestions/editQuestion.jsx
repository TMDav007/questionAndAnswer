import React from 'react';
import './style.scss';
import {connect} from 'react-redux';

export let EditQuestion = (props) => {

  const { getAllQuestions } = props;
  useEffect( ()=> {
    getAllQuestions();
  }, [])

}

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions())
  }
}

EditQuestion = connect(mapStateToProps, mapDispatchToProps)(EditQuestion);
