import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';


const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      const { token, loginId, user } = response.data;
      navigate('/calculator',{ state: { token, loginId, user } });
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
    }
  };

  const handleSignup = async () => {
      navigate('/register');
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
      </div>
      <div className="form">
        <div className="input-container">
          <label>Username </label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="button-container">
        <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div className="input-container">
        <p>Don't have an account? <span onClick={handleSignup} className="sign-link">Sign Up</span></p>
      </div>
    </div>
  
  );
};

export default Login;