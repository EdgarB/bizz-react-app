import React from 'react';
import './Button.scss';
import clsx from 'clsx';

function Button(props){
  const type = props.type;
  const isSecondary = type && type === 'secondary';
  return(
    <div 
      className={clsx('c-button', (isSecondary && 'c-button--secondary'), props.className )} 
      onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default Button;