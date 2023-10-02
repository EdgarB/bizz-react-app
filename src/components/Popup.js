import React from 'react';
import './Popup.scss';
import clsx from 'clsx';

const Popup = (props)=>{
  return(
    <div className={clsx('c-popup', (props.isHidden && 'c-popup--hidden'))}>
      <div className='c-popup__container'>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;