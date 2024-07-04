import { useEffect, useState, createContext, useContext } from "react";
import { PomodoroContext, PomodoroProvider } from "./PomodoroContext.jsx";
import Nav from "./components/Nav.jsx";
import HomePage from "./pages/HomePage.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import {
  ClerkProvider,
  useUser,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import { Combine, Home, Signal } from "lucide-react";
import Terms from "./pages/Terms.jsx"
import Privacy from "./pages/Privacy"
import Footer from "./components/Footer.jsx";

const PUBLISH_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISH_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = PUBLISH_KEY;

function PublicPage(props) {
  return (
    <>
      <Nav signedIn={props.signedOut} toggle={props.toggle} darkmodetoggle={props.darkmodetoggle} />
      <HomePage />
      <Footer />
    </>
  );
}

function ProtectedPage(props) {
  return (
    <>
      <Nav signedIn={props.signedIn} toggle={props.toggle} darkmodetoggle={props.darkmodetoggle} />
      <HomePage />
      <Footer />
    </>
  );
}

function App() {
  const [theme, setTheme] = useState(false)
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    // const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!localStorage.hasOwnProperty("theme")) {
      localStorage.setItem("theme", "light")
      setToggle(false)
    }

    if (localStorage.hasOwnProperty("theme")) {
      const selectedTheme = localStorage.getItem("theme");
      if (selectedTheme === "light") {
        document.body.classList.add("light");
        setToggle(false)
      } else if (selectedTheme === "dark") {
        document.body.classList.add("dark");
        setToggle(true)
      }
    }
  }, [])


  useEffect(() => {
    // Has to be two separate if statements for some reason, will revisit
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme === "light") {
      document.body.classList.remove("dark");
    } else if (selectedTheme === "dark") {
      document.body.classList.remove("light");
    }

    if (selectedTheme === "light") {
      document.body.classList.add("light");
    } else if (selectedTheme === "dark") {
      document.body.classList.add("dark");
    }

  }, [theme])

  const darkModeToggle = () => {
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme === "light") {
      localStorage.setItem("theme", "dark")
      setToggle(true)
    } else if (selectedTheme === "dark") {
      localStorage.setItem("theme", "light")
      setToggle(false)
    }
    setTheme(!theme)
    console.log(toggle)
    console.log(theme)
  }



  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <PomodoroProvider>
        {/* <Nav/> */}
        <Routes>

          {/* <Route path="/" element={<PublicPage signedIn={false} />} /> */}
          <Route path="/" element={
            <>
              <SignedIn>
                <ProtectedPage signedIn={true} toggle={toggle} darkmodetoggle={darkModeToggle} />
              </SignedIn>
              <SignedOut>
                <PublicPage signedIn={false} toggle={toggle} darkmodetoggle={darkModeToggle} />
              </SignedOut>
            </>
          } />
          <Route
            path="/sign-in/*"
            element={
              <SignIn redirectUrl="/" routing="path" path="/sign-in" />
            }
          />

          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route path="/toc"
            element={<Terms />}
          />
          <Route path="/privacy"
            element={<Privacy />}
          />
          {/* testing out preview branch */}
          {/* <Route */}
          {/*   path="/protected" */}
          {/*   element={ */}
          {/*     <> */}
          {/*       <SignedIn> */}
          {/*         <ProtectedPage signedIn={true} /> */}
          {/*       </SignedIn> */}
          {/*       <SignedOut> */}
          {/*         <PublicPage signedIn={false} /> */}
          {/*       </SignedOut> */}
          {/*     </> */}
          {/*   } */}
          {/* /> */}
        </Routes>
      </PomodoroProvider>
      <Analytics />
    </ClerkProvider>
  );
}

export default App;
