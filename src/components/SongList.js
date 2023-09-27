import React from 'react';
import Song from './Song.js';

import './SongList.scss';

function SongList(props){

  function isSongSelected(song){
    return song.id in props.songsSelected;
  }
  function songFormatted(song){
    //console.log(song.id)
    return(
      <div className='c-song-list__item' key={song.id}>
        <Song  name={song.songName} artist={song.artist} album={song.album} />
        {!isSongSelected(song) && 
          <div className='c-song-list__button'
            onClick={() => {props.handleOnClickAdd(song)}}
          > 
            + 
          </div>
        }
        
        {isSongSelected(song) && 
          <div className='c-song-list__button' onClick={
            () => {props.handleOnClickRemove(song)}}>
            -
          </div>
        }
      </div>
    )
  }
  return(
    <div className='c-song-list'>
      { props.songs.map((sObj) => {
        return songFormatted(sObj)
      })}
      
    </div>
  )
}

export default SongList;