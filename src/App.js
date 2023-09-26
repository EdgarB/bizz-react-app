import './App.css';
import NavBar from './components/NavBar';
import SongsDisplayer from './containers/SongsDisplayer';
function App() {
  return (
    <div className='c-app'>
      <NavBar> 
        BIZZ
      </NavBar>
      <SongsDisplayer/>
    </div>
  );
}

export default App;
