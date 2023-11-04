import { useState, useEffect, useContext } from "react";

import { Button } from "../../components/ui/button";
import ContributionGrid from "../components/ContributionGrid";
import PomodoroContext, { PomodoroProvider } from "../PomodoroContext.jsx";

import TodoWrapper from "../components/TodoWrapper";
import useSound from "use-sound";
import Alarm from "../assets/alarmSound.wav"

import '../../styles/style.css';
import Test from "./Test.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";


export const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

export default function HomePage() {
//   const [pomodoro, setPomodoro] = useState(1500);
//   const [shortBreak, setshortBreak] = useState(300);
//   const [longBreak, setlongBreak] = useState(900);

const { pomodoro, shortBreak, longBreak} = useContext(PomodoroContext);

    // const current = new Date();

    // console.log(
    // `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`
    // );
  

  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [backupSeconds, setBackupSeconds] = useState()
  const [paused, setPaused] = useState(false);

  const [play, {stop}] = useSound(Alarm)


  let hidden = isActive ? "block" : "hidden";

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0 && !paused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
        play()
        handleStopTimer(backupSeconds)
      setIsActive(false);
    }

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isActive, seconds, paused]);

  const handleStartTimer = (time) => {
    setSeconds(time);
    setBackupSeconds(time)
    setIsActive(true);
  };


  const handleStopTimer = (time) => {
    setIsActive(false);
    setSeconds(time);
  };


  return (
    <div className="mb-20 flex flex-col items-center">
      <Tabs
        defaultValue="pomodoro"
        className="w-[400px] mx-auto mt-20 flex flex-col"
      >
        <TabsList className="self-center">
          <TabsTrigger value="pomodoro" onClick={() => setSeconds(pomodoro)}>
            Pomodoro
          </TabsTrigger>
          <TabsTrigger
            value="shortBreak"
            onClick={() => setSeconds(shortBreak)}
          >
            Short break
          </TabsTrigger>
          <TabsTrigger value="longBreak" onClick={() => setSeconds(longBreak)}>
            Long Break
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pomodoro">
          <Card className="w-[400px] py-10 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="self-center text-6xl">
                {formatTime(seconds)}
              </CardTitle>
            </CardHeader>
            <div className="flex justify-center gap-4">
              { !isActive &&
                <Button
                className="mt-6 w-1/3 self-center"
                onClick={() => handleStartTimer(pomodoro)}
              >
                Start
              </Button>
              }

              <Button
                className={`mt-6 w-1/3 self-center ${hidden}`}
                //Pause button logic
                // onClick={() => handleStopTimer(pomodoro)}
                onClick={() => setPaused(!paused)}
              >
                {paused ? "Resume" : "Pause"}
              </Button>
             {
              isActive &&
              <Button
                className={`mt-6 w-1/3 self-center ${hidden}`}
                onClick={() => handleStopTimer(pomodoro)}
              >
                Skip
              </Button>
             } 
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="shortBreak">
          <Card className="w-[400px] py-10 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="self-center text-6xl">
                {formatTime(seconds)}
              </CardTitle>
            </CardHeader>
            <div className="flex justify-center gap-4">
              <Button
                className="mt-6 w-1/3 self-center"
                onClick={() => handleStartTimer(shortBreak)}
              >
                Start
              </Button>
              <Button
                className={`mt-6 w-1/3 self-center ${hidden}`}
                onClick={() => handleStopTimer(shortBreak)}
              >
                Reset
              </Button>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="longBreak">
          <Card className="w-[400px] py-10 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="self-center text-6xl">
                {formatTime(seconds)}
              </CardTitle>
            </CardHeader>
            <div className="flex justify-center gap-4">
              <Button
                className="mt-6 w-1/3 self-center"
                onClick={() => handleStartTimer(longBreak)}
              >
                Start
              </Button>
              <Button
                className={`mt-6 w-1/3 self-center ${hidden}`}
                onClick={() => handleStopTimer(longBreak)}
              >
                Reset
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <TodoWrapper />

   
        {/* <iframe className="mt-10 mx-auto rounded-lg max-w-md" src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
      
    </div>
  );
}
