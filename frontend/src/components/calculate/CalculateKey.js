import React from "react";
import "./CalculateKey.css";

function CalculateKey(props) {
  return (
    <button className={`${props.className}`}
      onClick={() => props.onClick(props.keyValue)}
    >
      {props.keyValue}{" "}
    </button>
  );
}

export default CalculateKey;