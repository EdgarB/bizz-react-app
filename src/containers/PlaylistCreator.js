import React from 'react';
import Card from '../components/Card';
import SongList from '../components/SongList';


function PlaylistCreator(props){
  return(
    <Card>
      <h1> Playlist </h1>
      <SongList 
      handleOnClickAdd={props.handleOnClickAdd}
      handleOnClickRemove={props.handleOnClickRemove}
      songsSelected={props.songsSelected}
      songs={props.songs || []}/>
    </Card>
  )
}

export default PlaylistCreator;