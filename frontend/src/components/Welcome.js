import React from 'react';
import '../App.css';
import {BsFillChatQuoteFill} from 'react-icons/bs';
import {AiFillAlipayCircle} from 'react-icons/ai';
import {Link} from 'react-router-dom';


function Welcome() {
  return (
      <header className="App-header">
        <AiFillAlipayCircle className='App-logo'/>
        <h1 className="App-link">NUNTIUS</h1>
        <Link to='/browse'>
            <p><BsFillChatQuoteFill/>Start</p>
        </Link>
      </header>
  );
}

export default Welcome;
