import React from 'react';
import './NavBar.scss';

function NavBar(props){
  return(
    <div className='c-nav-bar'>
      {props.children}
    </div>
  )
}

export default NavBar;