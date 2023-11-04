import { useState,createContext , useContext } from "react";
import { PomodoroContext, PomodoroProvider } from "./PomodoroContext.jsx";
import Nav from "./components/Nav.jsx"
import HomePage from "./pages/HomePage.jsx"
import {Routes, Route,useNavigate } from "react-router-dom"

import LoginPage from "./pages/LoginPage.jsx";
import env from "react-dotenv";
// import {process} from  'dotenv/config'
// require('dotenv').config()
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import { Home } from "lucide-react";


// import CountdownTimer from "./pages/CountdownTimer.jsx";

const PUBLISH_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISH_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = PUBLISH_KEY


function PublicPage() {
  return (
    <>
      <Nav/>
      <HomePage/>
    </>
  );
}


function ProtectedPage() {
  return (
    <>
      <Nav/>
      <HomePage/>
    </>
  )
}

function App() {

  const navigate = useNavigate();

  return (
  
     <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <PomodoroProvider>
      {/* <Nav/> */}
        <Routes>
          {/* <Route path="/" element={<HomePage/>}/> */}
          <Route path="/" element={<PublicPage/>} />

          <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl="/protected" routing="path" path="/sign-in" />}
          />

          <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
          />
          {/* <Route path="/login" element={<LoginPage/>}/> */}
          <Route
          path="/protected"
          element={
          <>
            <SignedIn>
              <ProtectedPage />
            </SignedIn>
             <SignedOut>
              <PublicPage />
           </SignedOut>
          </>
          }
        />
        </Routes>
      </PomodoroProvider>
    </ClerkProvider>
  );
}

export default App;
