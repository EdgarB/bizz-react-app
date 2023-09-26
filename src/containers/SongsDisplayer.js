import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import InputText from "../components/InputText";
import SongList from "../components/SongList";

function SongsDisplayer(props){
  const [searchInput, setSearchInput] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(()=>{
    const ss = [
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      },
      {
        songName: 'A head full of dreams',
        artist: 'Coldplay',
        album: 'Ace',
      }
    ]

    setSongs(ss);
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
      <hr/>
      <SongList songs={songs}/>
    </Card>
  );
}

export default SongsDisplayer