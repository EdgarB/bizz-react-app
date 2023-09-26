import React from 'react';
import Song from './Song.js';

import './SongList.scss';


function songFormatted(song, key){
  
  return(
    <div className='c-song-list__item'>
      <Song key={key} name={song.songName} artist={song.artist} album={song.album} />
      {song.added && <div> Add </div>}
      {!song.added && <div> Remove </div>}
    </div>
  )
 
}


function SongList(props){
  return(
    <div className='c-song-list'>
      { props.songs.map((sObj, index) => {
        const key = `${sObj.songName}-${index}`;
        return songFormatted(sObj, key)
      })}
      
    </div>
  )
}

export default SongList;