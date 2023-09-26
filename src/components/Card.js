import React from 'react';

import './Card.scss';

function Card(props){
  return(
    <div className='c-card'>
      {props.children}
    </div>
  );
}

export default Card;