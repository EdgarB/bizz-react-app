import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import InputText from "../components/InputText";
import SongList from "../components/SongList";
import './SongSelector.scss';

function SongsSelector(props){
  const [searchInput, setSearchInput] = useState('');
  
  useEffect(()=>{
    props.searchSongs();
  }, [searchInput])

  function handleSearchInputChange(event){
    setSearchInput(event.currentTarget.value);
  }

  function Header(){
    return(
      <InputText 
          value={searchInput}
          placeholder='Search a song' 
          onChange={handleSearchInputChange}
          name='search_song_term'
        />
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