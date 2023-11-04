import { Link } from "react-router-dom";
import { useContext } from "react";
import { PomodoroContext } from "../PomodoroContext.jsx";
import { formatTime } from "../pages/HomePage.jsx";
import Report from "./Report.jsx";
// import "../../styles/style.css"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import{
UserButton,
} from "@clerk/clerk-react"

export default function Nav() {

  const { pomodoro, shortBreak, longBreak,changePomodoro, changeShortBreak, changeLongBreak } = useContext(PomodoroContext);
  

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            FocusTrackr
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/sign-in"
            className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  "
          >
            Login
          </Link>

          <div>
            <Report/>
          </div>

          <div>
            <UserButton/>
          </div>
          
          <Dialog>
            <DialogTrigger className="mt-2">
              <ion-icon name="settings-outline"></ion-icon>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <form className="w-full max-w-lg ">
                  <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-first-name"
                      >
                        Pomodoro
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="number"
                        placeholder={formatTime(pomodoro)}
                        onChange={(e) => changePomodoro(e.target.value)}
                      />
                    
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Short Break
                      </label>
                      <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="number"
                        placeholder={formatTime(shortBreak)}
                        onChange={(e) => changeShortBreak(e.target.value)}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Long Break
                      </label>
                      <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
        </div>
      </div>
    </nav>
  );
}
