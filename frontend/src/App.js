import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Calculator from "./components/calculate/Calculator";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Calculator /> : <Login setToken={setToken} />
          }
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/calculator" element={<Calculator user={{ username: 'DummyUser' }} setToken={ setToken}/>} />
      </Routes>
    </Router>
  );
};

export default App;
