import { useState, useEffect, useContext } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "../../components/ui/button";
import ContributionGrid from "../components/ContributionGrid";
import PomodoroContext, { PomodoroProvider } from "../PomodoroContext.jsx";
import TodoWrapper from "../components/TodoWrapper";
import useSound from "use-sound";
import Alarm from "../assets/alarmSound.wav"
import '../../styles/style.css';
import {
  Card,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useAuth } from "@clerk/clerk-react";
import { Footer } from "react-day-picker";
// import { defaultMethod } from "react-router-dom/dist/dom";

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

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  const { setPomodoro, pomodoro, shortBreak, longBreak } = useContext(PomodoroContext);

  // const current = new Date();

  // console.log(
  // `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`
  // );

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [backupSeconds, setBackupSeconds] = useState()
  const [paused, setPaused] = useState(false);
  const [pomo, setPomo] = useState(false);
  const userid = user?.id;
  const [play, { stop }] = useSound(Alarm)

  let formData = {
    creator: userid,
    hours: 0,
    count: 1
  }

  let hidden = isActive ? "block" : "hidden";

  useEffect(() => {
    setSeconds(shortBreak)
  }, [shortBreak])

  useEffect(() => {
    setSeconds(longBreak)
  }, [longBreak])

  useEffect(() => {
    setSeconds(pomodoro)
  }, [pomodoro])


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
      if (pomo) {
        formData.hours = backupSeconds / 60;
        // console.log(formData)
        setPomo(false)
      }
      const postData = async () => {
        try {
          const response = await fetch(`${backendURL}/pomo/postpomo`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
          )
          if (!response.ok) {
            throw new Error('Failed to login');
          }
          const data = await response.json();
          console.log('Successful response')
        } catch (error) {
          console.error("error posting data", error)
        }
      }
      postData();
    }
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isActive, seconds, paused]);

  const handleStartTimer = (time) => {
    setBackupSeconds(time)
    setSeconds(time);
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
              <CardTitle className="self-center text-8xl">
                {formatTime(seconds)}
              </CardTitle>
            </CardHeader>
            <div className="flex justify-center gap-4">
              {!isActive &&
                <Button
                  className="mt-6 w-1/3 self-center"
                  onClick={() => {
                    handleStartTimer(pomodoro)
                    setPomo(true)
                  }
                  }
                >
                  Start
                </Button>
              }

              <Button
                className={`mt-6 w-1/3 self-center ${hidden}`}
                //Pause button logic
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
              <CardTitle className="self-center text-8xl">
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
              <CardTitle className="self-center text-8xl">
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
      <Footer>
        <a><p>Privacy Policy</p></a>
        <a><p>Terms</p></a>
      </Footer>
    </div>
  );
}
