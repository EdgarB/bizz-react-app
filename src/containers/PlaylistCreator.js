import React, {useState, useContext} from 'react';
import Card from '../components/Card';
import SongList from '../components/SongList';
import './PlaylistCreator.scss';
import Button from '../components/Button';
import {createPlaylistOnSpotify} from '../util/SpotiftyApi';
import InputText from '../components/InputText';
import { PopupContext } from '../contexts/PopupContext';

function PlaylistCreator(props){
  const [playlistName, setPlaylistName] = useState('THE PLAYLIST');
  const {setIsPopupHidden, setPopupContent, setIsPopupLoading} = useContext(PopupContext);


  const playlistNameInputChangeHandler = (event)=>{
    setPlaylistName(event.currentTarget.value);
  }

  const isDataReadyToCreatePlaylist = ()=>{
    return playlistName.trim().length > 0 && props.songs.length > 0;
  }

  const onClickSaveHandler = (event) => {
    if(isDataReadyToCreatePlaylist()){
      setIsPopupHidden(false);
      setIsPopupLoading(true);
      setPopupContent('Creating Playlist');
      const onSuccess = ()=>{
        setIsPopupLoading(false);
        setPopupContent('PLAYLIST CREATED!!!')
        setTimeout(()=>{ 
          setIsPopupHidden(true);
          setPopupContent('');
        }, 1500);
      }
      const onLoading = (state)=>{
        setPopupContent(state);
      }
      const onError = (error)=>{
        setIsPopupLoading(false);
        setPopupContent(error)
        setTimeout(()=>{ 
          setIsPopupHidden(true);
          setPopupContent('');
        }, 1500);
      }
      createPlaylistOnSpotify( playlistName,songsSelectedURIS(), onLoading, onSuccess, onError);

    }
  }

  const songsSelectedURIS = ()=>{
    return props.songs.map((s)=>{
      return s.uri;
    })
  }

  const body = ()=>{
    if(props.songs.length > 0){
      return(
        <SongList 
          handleOnClickAdd={props.handleOnClickAdd}
          handleOnClickRemove={props.handleOnClickRemove}
          songsSelected={props.songsSelected}
          songs={props.songs || []}/>
      )
    }else{
      return(<p className='c-playlist-creator__message'>{"Let's add some songs for your new playlist :)"}</p>)
    }
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
        body={body()}
        footer={<Button 
          isDisabled={!isDataReadyToCreatePlaylist()} 
          onClick={onClickSaveHandler} 
          type='secondary'>Save to spotify</Button>}
      />
    
    </div>
  )
}

export default PlaylistCreator;