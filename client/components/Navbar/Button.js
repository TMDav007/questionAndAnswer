import React from 'react';
import './Button.scss'

const STYLES = [
  'btn--primary',
  'btn--outline'
]

const SIZES = [
  'btn--medium',
  'btn--large'
]

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonSyle = STYLES.includes(buttonStyle)? buttonStyle: STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize)? buttonSize: STYLES[0];

  return (
    <button className={`btn ${checkButtonSyle}  ${checkButtonSize}`} onClick={onClick} type={type}>{children}</button>
  )
}