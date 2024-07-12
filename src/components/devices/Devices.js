import React, { useState } from 'react';
import Todo from '../../components/posts/Todo';   

function Devices() { 
  return (
    <> 
      <div className="custHome">
        <div className="container">   
          <div className="deviceComponent"> 
            <Todo/> 
          </div>
        </div>
      </div>
    </> 
  )
}

export default Devices;