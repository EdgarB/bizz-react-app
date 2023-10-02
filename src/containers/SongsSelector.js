import React from "react";
import Card from "../components/Card";
import SongList from "../components/SongList";
import './SongSelector.scss';

function SongsSelector(props){

  const header = () => {
    return(
      <h1>Search Results</h1>
    )
  }
  const body = () => {
    if(props.songs.length > 0){
      return(
        <SongList 
          songs={props.songs} 
          handleOnClickAdd={props.handleOnClickAdd} 
          handleOnClickRemove={props.handleOnClickRemove}
          songsSelected={props.songsSelected}/>
      )
    }else{
      return(
        <p className='c-song-selector__message'>
          {"Let's search some songs for your new playlist :)"}
        </p>
      )

    }
   
    
  }

  return(
    <div className="c-song-selector">
      <Card header={header()} body={body()}/>
    </div>
  );
}

export default SongsSelector;