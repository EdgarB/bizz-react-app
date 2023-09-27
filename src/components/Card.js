import React from 'react';

import './Card.scss';

function Card(props){
  return(
    <div className='c-card'>
      <div className='c-card__header'>{props.header}</div>
      <div className='c-card__body'>{props.body}</div>
      <div className='c-card__footer'>{props.footer}</div>
    </div>
  );
}

export default Card;