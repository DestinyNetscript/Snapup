import React, { useState } from 'react'; 
import Navbar from '../components/Navbar.js';
import MainContent from '../components/MainContent.js';

function Home() { 
  return (
    <> 
      <div className="custHome">
          <div className="container">
              <div className="dashboard"> 
                <div className="main">
                  <MainContent/>
                </div>
              </div>
          </div>
      </div>
    </> 
  )
}

export default Home;