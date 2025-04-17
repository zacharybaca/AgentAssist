// components/Loader.jsx
import './loader.css';
import React from 'react';
import Logo from "../../assets/agent-assist-favicon-no-background.png";

const Loader = () => (
  <div id="loader-container">
    <div id="loader">
        <img src={Logo} alt="logo" />
    </div>
  </div>
);

export default Loader;
