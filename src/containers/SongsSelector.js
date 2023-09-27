import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import InputText from "../components/InputText";
import SongList from "../components/SongList";

function SongsSelector(props){
  const [searchInput, setSearchInput] = useState('');
  
  useEffect(()=>{
    props.searchSongs();
  }, [searchInput])

  function handleSearchInputChange(event){
    setSearchInput(event.currentTarget.value);
  }

  return(
    <Card>
      <InputText 
        value={searchInput}
        placeholder='Search a song' 
        onChange={handleSearchInputChange}
        name='search_song_term'
      />
      <SongList 
      songs={props.songs} 
      handleOnClickAdd={props.handleOnClickAdd} 
      handleOnClickRemove={props.handleOnClickRemove}
      songsSelected={props.songsSelected}/>
    </Card>
  );
}

export default SongsSelector;