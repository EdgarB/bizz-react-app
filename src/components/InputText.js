import React from 'react';
import './InputText.scss';

function InputText(props){
  return(
    <input className='c-input-text' 
      type='text'
      name={props.name}
      value={props.value} 
      placeholder={props.placeholder} 
      onChange={props.onChange}/>
  )
}

export default InputText;
