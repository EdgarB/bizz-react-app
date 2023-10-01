import React from 'react';
import './Button.scss';
import clsx from 'clsx';

function Button(props){
  const type = props.type;
  const isSecondary = type && type === 'secondary';
  const isDisabled = props.isDisabled;
  return(
    <div 
      className={clsx('c-button', (isSecondary && 'c-button--secondary'), (isDisabled && 'c-button--disabled'), props.className )} 
      onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default Button;