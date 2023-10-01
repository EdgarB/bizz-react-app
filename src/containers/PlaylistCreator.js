import React from 'react';
import Card from '../components/Card';
import SongList from '../components/SongList';
import './PlaylistCreator.scss';
import Button from '../components/Button';
import {createPlaylistOnSpotify} from '../util/SpotiftyApi';

function PlaylistCreator(props){
  function songsSelectedURIS(){
    return props.songs.map((s)=>{
      return s.uri;
    })
  }

  function Header(){
    return(
      <h1> Playlist </h1>
    )
  }

  function Body(){
    return(
      <SongList 
          handleOnClickAdd={props.handleOnClickAdd}
          handleOnClickRemove={props.handleOnClickRemove}
          songsSelected={props.songsSelected}
          songs={props.songs || []}/>
    )
  }

  function Footer(){
    return(
      <Button onClick={()=>{ createPlaylistOnSpotify('THE PLAYLIST 2',songsSelectedURIS())}} type='secondary'>Save to spotify</Button>
    )
  }
  
  return(
    <div className='c-playlist-creator'>
      <Card
        header= {<Header/>}
        body={<Body/>}
        footer={<Footer/>}
      />
    
    </div>
  )
}

export default PlaylistCreator;