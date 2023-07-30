import { useState } from "react";
import Nav from "./components/Nav.jsx"
import HomePage from "./pages/HomePage.jsx"
import "./App.css";
import {Routes, Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    
      
    <>
    <Nav/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>

</>
  );
}

export default App;
