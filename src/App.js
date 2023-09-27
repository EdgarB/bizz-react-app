import React, {useState, useEffect} from 'react';

import './App.scss';
import './Helpers.scss';
import NavBar from './components/NavBar';
import SongsSelector from './containers/SongsSelector';
import PlaylistCreator from './containers/PlaylistCreator';
import InputText from './components/InputText';
import Button from './components/Button';

function searchSongs(input){
  return [
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 1,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 2,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 3,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 4,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 5,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 6,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 7,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 8,
      isAdded: false
    },
    {
      songName: 'A head full of dreams',
      artist: 'Coldplay',
      album: 'Ace',
      id: 9,
      isAdded: false
    }
  ]

}


function App() {
  const [songsSelected, setSongsSelected]= useState({});
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(()=>{
    setSongs(searchSongs());
  }, [searchTerm])

  function handleOnClickAdd(song){
    setSongsSelected((prevSongs)=>{ 
      prevSongs[song.id] = song
      return Object.assign({}, prevSongs)})
  }

  
 

  function handleOnClickRemove(song){
    setSongsSelected((prev)=>{
      delete prev[song.id];

      return Object.assign({}, prev)
    })
  }

  function onSearchTermChange(event){
    setSearchTerm(event.currentTarget.value)
  }



  return (
    <div className='c-app'>
      <NavBar> 
        BIZZ
      </NavBar>
      <div className='c-app__header'>
        <InputText 
          value={searchTerm}
          placeholder='Search a song' 
          onChange={onSearchTermChange}
          name='search_song_term'
          className='h-mb-8px'
        />
        <Button>Search</Button>
      </div>  
      <div className='c-app__content'>
        <SongsSelector
          songs ={songs}
          searchSongs={searchSongs} 
          songsSelected={songsSelected} 
          handleOnClickAdd={handleOnClickAdd} 
          handleOnClickRemove={handleOnClickRemove}/>
        <PlaylistCreator songs={Object.values(songsSelected)} songsSelected={songsSelected} handleOnClickAdd={handleOnClickAdd} handleOnClickRemove={handleOnClickRemove}/>
      </div>
      
    </div>
  );
}

export default App;
