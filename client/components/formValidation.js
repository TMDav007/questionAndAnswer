import React, {useState, useEffect } from  "react";

function formValidation(initalState, validate) {
  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  let validationErrors = validate(values);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log("authenticated!", values)
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors])

  function handleChange(event){
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
    setErrors(validationErrors);
  }

  function handleBlur() {
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  }

  return { handleBlur, handleChange, handleSubmit, errors, values, isSubmitting }
}

export default formValidation;