import React, {useState} from 'react';
import Card from '../components/Card';
import SongList from '../components/SongList';
import './PlaylistCreator.scss';
import Button from '../components/Button';
import {createPlaylistOnSpotify} from '../util/SpotiftyApi';
import InputText from '../components/InputText';

function PlaylistCreator(props){
  const [playlistName, setPlaylistName] = useState('THE PLAYLIST');

  const playlistNameInputChangeHandler = (event)=>{
    setPlaylistName(event.currentTarget.value);
  }

  const isDataReadyToCreatePlaylist = ()=>{
    return playlistName.trim().length > 0 && props.songs.length > 0;
  }

  const onClickSaveHandler = (event) => {
    if(isDataReadyToCreatePlaylist()){
      createPlaylistOnSpotify( playlistName,songsSelectedURIS());
    }
  }

  const songsSelectedURIS = ()=>{
    return props.songs.map((s)=>{
      return s.uri;
    })
  }
  
  return(
    <div className='c-playlist-creator'>
      <Card
        header= {<div>
          <h1 className='h-mb-8px'>Playlist</h1>
          <InputText
          value={playlistName}
          name='playlist_name'
          placeholder='Playlist name'
          
          onChange={playlistNameInputChangeHandler}/>
        </div>}
        body={<SongList 
          handleOnClickAdd={props.handleOnClickAdd}
          handleOnClickRemove={props.handleOnClickRemove}
          songsSelected={props.songsSelected}
          songs={props.songs || []}/>}
        footer={<Button 
          isDisabled={!isDataReadyToCreatePlaylist()} 
          onClick={onClickSaveHandler} 
          type='secondary'>Save to spotify</Button>}
      />
    
    </div>
  )
}

export default PlaylistCreator;