import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { NavLink } from 'react-router-dom';
import logo from "../images/login.png"; 
import axios from 'axios';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    try {
      await login(email, password);
      setError('');
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setError('');
    if (!forgotPasswordEmail) {
      setError('Email is required.');
      return;
    }
    try { 
      await axios.post('https://dummyjson.com/api/forgot-password', { email: forgotPasswordEmail });
      alert('Password recovery email sent!');
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (err) {
      setError('Failed to send password recovery email. Please try again.');
    }
  }; 

  return (
    <div className="login">
      <div className="loginContent">
        <img src={logo} alt="logo" />
         <h2>{showForgotPassword ? 'Recover account' : 'Login to your account'}</h2>
        {!showForgotPassword ? (
          <form onSubmit={handleLogin}>
            <label>
              <i className="fa fa-user"></i>
              <input
                type="text"
                value={email}
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </label>
            <label>
              <i className="fa fa-lock"></i>
              <input
                type="password"
                value={password} 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>
            <button type="submit">Login</button>
            {error && <p className="loginError">{error}</p>}
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <label>
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                value={forgotPasswordEmail}
                placeholder="Enter your email"
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
            </label>
            <button type="submit">Send Recovery Email</button>
            {error && <p className="loginError">{error}</p>}
          </form>
        )}
        
      {!showForgotPassword && (
          <>
            {/*<button onClick={() => responseGoogle()} className="googleLogin"><i className="fa-brands fa-google"></i> Login with Google</button>
            <FacebookLogin
              appId="1183036396048888"
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            />*/}
            <NavLink to="#" onClick={() => setShowForgotPassword(true)}>Forgot the password?</NavLink>
          </>
        )} 

        {showForgotPassword && (
          <button onClick={() => setShowForgotPassword(false)}>Back to Login</button>
        )}
      </div>
    </div>
  );
}

export default Login;
