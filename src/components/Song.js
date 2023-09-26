import React from 'react';
import './Song.scss'

function Song(props){
  return(
    <div className='c-song'>
      <p className='c-song__title'>{props.name}</p>
      <p className='c-song__subtitle'>{props.artist} | {props.album}</p>
    </div>
  )
}

export default Song;