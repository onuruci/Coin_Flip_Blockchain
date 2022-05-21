import React from "react";
import { useState,  useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AdminPage from "./Components/AdminPage";

import './styles/styles.css';

function App() {
  const [wallet, setWallet] = useState('');

  return (
    <div className="w-100 bg-gr app">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home wallet={wallet} setWallet={setWallet}/>} />
          <Route path="admin" element={<AdminPage wallet={wallet} setWallet={setWallet}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
