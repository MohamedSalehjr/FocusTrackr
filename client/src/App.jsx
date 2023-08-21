import { useState,createContext , useContext } from "react";
import { PomodoroContext, PomodoroProvider } from "./PomodoroContext.jsx";
import Nav from "./components/Nav.jsx"
import HomePage from "./pages/HomePage.jsx"
import {Routes, Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx";


// import CountdownTimer from "./pages/CountdownTimer.jsx";

function App() {

  return (
    
      
    <>
    <PomodoroProvider>
    <Nav/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </PomodoroProvider>
    {/* <CountdownTimer/> */}
</>
  );
}

export default App;
