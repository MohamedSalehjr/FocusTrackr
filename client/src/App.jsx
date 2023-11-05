import { useState,createContext , useContext } from "react";
import { PomodoroContext, PomodoroProvider } from "./PomodoroContext.jsx";
import Nav from "./components/Nav.jsx"
import HomePage from "./pages/HomePage.jsx"
import {Routes, Route,useNavigate } from "react-router-dom"


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


function PublicPage(props) {
  return (
    <>
      <Nav signedIn={props.signedIn}/>
      <HomePage/>
    </>
  );
}


function ProtectedPage(props) {
  return (
    <>
    {console.log(props.signedIn)}
      <Nav signedIn={props.signedIn}/>
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
          <Route path="/" element={<PublicPage signedIn={false}/>} />

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
              <ProtectedPage signedIn={true} />
            </SignedIn>
             <SignedOut>
              <PublicPage signedIn={false}/>
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
