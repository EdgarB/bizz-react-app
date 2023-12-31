import React, {useState, useEffect} from 'react';

import './App.scss';
import './Helpers.scss';
import NavBar from './components/NavBar';
import SongsSelector from './containers/SongsSelector';
import PlaylistCreator from './containers/PlaylistCreator';
import InputText from './components/InputText';
import Button from './components/Button';
import { searchOnSpotify } from './util/SpotiftyApi';
import Popup from './components/Popup';
import { PopupContext } from './contexts/PopupContext';
import LoadingEllipses from './components/LoadingEllipses';


function App() {
  const [songsSelected, setSongsSelected]= useState({});
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupHidden, setIsPopupHidden] = useState(true);
  const [popupContent, setPopupContent] = useState('Loading')
  const [isPopupLoading, setIsPopupLoading] = useState(false)

  useEffect(()=>{
    if(songs.length > 0){
      setIsPopupLoading(false);
      setIsPopupHidden(true)
      setPopupContent('');
    }
  }, [songs])

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

  async function searchTermOnSpotify(event){
    if(searchTerm !== ""){
      setSongs([]);
      setIsPopupLoading(true);
      setPopupContent('Loading')
      setIsPopupHidden(false);
      const searchResults = await searchOnSpotify(searchTerm);
      if(searchResults){
        const songsArr = searchResults.tracks.items.map((song)=>{
          return {
            songName: song.name,
            artist: Object.values(song.artists).map(a => a.name).join(', '),
            album: song.album.name,
            id: song.id,
            uri: song.uri
          }
        });
        setSongs(songsArr);
      }
    }
  }


  return (
    <PopupContext.Provider value={{setIsPopupHidden, setPopupContent, setIsPopupLoading}}>
      <div className='c-app'>
        <Popup isHidden={isPopupHidden}>
          {popupContent}
          {isPopupLoading && <LoadingEllipses/>}
        </Popup>
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
          <Button isDisabled={searchTerm===''} onClick={searchTermOnSpotify}>Search</Button>
        </div>  
        <div className='c-app__content'>
          <SongsSelector
            songs ={songs}
            songsSelected={songsSelected} 
            handleOnClickAdd={handleOnClickAdd} 
            handleOnClickRemove={handleOnClickRemove}/>
          <PlaylistCreator 
            songs={Object.values(songsSelected)} 
            songsSelected={songsSelected} 
            handleOnClickAdd={handleOnClickAdd} 
            handleOnClickRemove={handleOnClickRemove}/>
        </div>
        
      </div>
    </PopupContext.Provider>
  );
}

export default App;
