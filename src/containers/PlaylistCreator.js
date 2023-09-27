import React from 'react';
import Card from '../components/Card';
import SongList from '../components/SongList';
import './PlaylistCreator.scss';
import Button from '../components/Button';

function PlaylistCreator(props){
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
      <Button type='secondary'>Save to spotify</Button>
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