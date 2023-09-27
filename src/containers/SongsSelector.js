import React from "react";
import Card from "../components/Card";
import SongList from "../components/SongList";
import './SongSelector.scss';

function SongsSelector(props){

  function Header(){
    return(
      <h1>Search Results</h1>
    )
  }
  function Body(){
    return(
      <SongList 
        songs={props.songs} 
        handleOnClickAdd={props.handleOnClickAdd} 
        handleOnClickRemove={props.handleOnClickRemove}
        songsSelected={props.songsSelected}/>
    )
    
  }

  return(
    <div className="c-song-selector">
      <Card header={<Header/>} body={<Body/>}/>
    </div>
  );
}

export default SongsSelector;