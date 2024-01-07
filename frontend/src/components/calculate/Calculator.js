import React, { useState, useEffect } from "react";
import CalculateKey from "./CalculateKey";
import "./Calculator.css";
import {jwtDecode} from 'jwt-decode';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function Calculator() {
  const navigate = useNavigate();
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);
  const location = useLocation();
  const { token,user,loginId } = location.state;
  const [logId] = useState(loginId);
  

  useEffect(() => {
    const isTokenExpired = () => {
      if (!token) {
        return true;
      }
    
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
      } catch (error) {
        return true;
      }
    };
    if (isTokenExpired()) {
      navigate('/'); 
    }
  }, [op, nextValue, prevValue,user, navigate, token]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const performOperation = () => {
    let temp = CalculatorOperations[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };
  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };
  const changeSign = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };
  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  const handleOperation = (value) => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clearData();
    } else if (value === "\xB1") {
      changeSign();
    } else if (value === ".") {
      insertDot();
    } else if (value === "%") {
      percentage();
    }
  };

  const onLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/logout', {
        logId
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
    }
  };
  
  return (
    <div className="calculator">
       <div className="header">
        <h5>Welcome, {user && user.username ? user.username : 'Guest'}!</h5>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="calculator-input">
        <div className="result">{nextValue} </div>
      </div>
      <div className="calculator-keypad">
        <div className="keys-function">
          <CalculateKey keyValue={"c"} onClick={handleOperation} />
          <CalculateKey keyValue={"\xB1"} onClick={handleOperation} />
          <CalculateKey keyValue={"%"} onClick={handleOperation} />
        </div>
        <div className="keys-operators">
          <CalculateKey keyValue={"+"} onClick={handleOperation} />
          <CalculateKey keyValue={"-"} onClick={handleOperation} />
          <CalculateKey keyValue={"*"} onClick={handleOperation} />
          <CalculateKey keyValue={"/"} onClick={handleOperation} />
          <CalculateKey keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="keys-numbers">
          <CalculateKey keyValue={9} onClick={handleOperation} />
          <CalculateKey keyValue={8} onClick={handleOperation} />
          <CalculateKey keyValue={7} onClick={handleOperation} />
          <CalculateKey keyValue={6} onClick={handleOperation} />
          <CalculateKey keyValue={5} onClick={handleOperation} />
          <CalculateKey keyValue={4} onClick={handleOperation} />
          <CalculateKey keyValue={3} onClick={handleOperation} />
          <CalculateKey keyValue={2} onClick={handleOperation} />
          <CalculateKey keyValue={1} onClick={handleOperation} />
          <CalculateKey
            className="key-dot"
            keyValue={"."}
            onClick={handleOperation}
          />
          <CalculateKey
            className="key-zero"
            keyValue={0}
            onClick={handleOperation}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;