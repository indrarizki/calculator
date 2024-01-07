import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error registering user:', error.response.data.error);
    }
  };

  const handleSignin = async () => {
    navigate('/');
  };

  return (
      <div className="app">
      <div className="login-form">
        <div className="title">Register</div>
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
        <div className="button-register">
        <button onClick={handleRegister}>Register</button>
        </div>
      </div>
      <div className="input-container">
        <p>have an account? <span onClick={handleSignin} className="sign-link">Sign In</span></p>
      </div>
    </div>
  );
};

export default Register;