import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import Header from './components/header/Header';
import Login from './components/Login';
import Devices from './components/devices/Devices';
import Users from './components/users/Users';
import ProtectedRoute from './components/ProtectedRoute';
import UsersProfile from './components/users/UsersProfile';
import Setting from './components/settings/Setting';
import Notifications from './components/notifications/Notifications';
import Navbar from './components/Navbar.js';
import { useAuth } from './AuthContext';  
import { UserProvider } from './components/users/UserContext';

function App() {
  const { isAuthenticated } = useAuth();
 
  if (!isAuthenticated) {
    return <Login />;
  }
 
  return ( 
     <UserProvider>
      <div className="dashboard">
        <div className="sidebar">
          <Navbar /> 
        </div>
        <div className="main"> 
          <Header/>
          <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/userProfile/:userId" element={<UsersProfile />} />
            <Route path="/devices" element={<Devices />} /> 
            <Route path="/users" element={<Users />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Setting />} /> 
          </Routes>
        </div>
      </div>
      </UserProvider>
   
  );
}

export default App;
