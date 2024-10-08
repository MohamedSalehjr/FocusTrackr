import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PomodoroContext } from "../PomodoroContext.jsx";
import { formatTime } from "../pages/HomePage.jsx";
import Report from "./Report.jsx";
import { useAuth } from "@clerk/clerk-react";
import logo from "../tomato.svg"
// import "../../styles/style.css"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { UserButton } from "@clerk/clerk-react";
import { document } from "postcss";

export default function Nav(props) {
  const {
    setPomodoro,
    pomodoro,
    shortBreak,
    longBreak,
    changePomodoro,
    changeShortBreak,
    changeLongBreak,
  } = useContext(PomodoroContext);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [theme, setTheme] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-background">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="/" className="flex items-center">
          <img alt="logo" src={logo} className="w-8" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-textcolor">
            PomoTrackr
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {/* {console.log(props.signedIn)} */}
          {!props.signedIn && (
            <Link
              to="/sign-in"
              className="block  text-textcolor rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
            >
              Login
            </Link>
          )}

          {props.signedIn && (
            <div>
              <Report />
            </div>
          )}

          <Dialog>
            <DialogTrigger className="mt-2">
              <ion-icon name="settings-outline" ></ion-icon>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <form className="w-full max-w-lg ">
                  <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-textsub text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        Pomodoro
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 dark:bg-black text-textsub border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="number"
                        placeholder={formatTime(pomodoro)}
                        onChange={(e) => changePomodoro(e.target.value)} />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-textsub  text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Short Break
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 dark:bg-black text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="number"
                        placeholder={formatTime(shortBreak)}
                        onChange={(e) => changeShortBreak(e.target.value)}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-textsub text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Long Break
                      </label>
                      <input
                        className="appearance-none block w-full dark:bg-black bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="number"
                        placeholder={formatTime(longBreak)}
                        onChange={(e) => changeLongBreak(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <button onClick={props.darkmodetoggle} className=" mt-2">
            {
              props.toggle && <ion-icon name="moon-outline"></ion-icon>
            }
            {
              !props.toggle && <ion-icon name="sunny-outline"></ion-icon>}
          </button>


          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}
