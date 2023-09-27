import React from 'react';
import './InputText.scss';
import clsx from 'clsx';

function InputText(props){
  return(
    <input className={clsx('c-input-text', props.className)} 
      type='text'
      name={props.name}
      value={props.value} 
      placeholder={props.placeholder} 
      onChange={props.onChange}/>
  )
}

export default InputText;
