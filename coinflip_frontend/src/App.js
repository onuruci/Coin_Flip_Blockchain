import React from "react";
import { useState,  useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

import './styles/styles.css';

function App() {
  const [wallet, setWallet] = useState('');

  return (
    <div className="w-100 bg-gr app">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home wallet={wallet} setWallet={setWallet}/>} />
          <Route path="admin" element={<div>Admin</div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
