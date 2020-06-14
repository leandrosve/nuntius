import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {AiFillAlipayCircle} from 'react-icons/ai';


function Nav() {
  return (
      <div className="Nav">
          <div className="Nav-content">
            <AiFillAlipayCircle className='Nav-logo'/>
            <h1>NUNTIUS</h1>
            <div className="Nav-links">
                <Link to='/logout'>
                    Logout
                </Link>
            </div>
        </div>
      </div>
  );
}

export default Nav;
