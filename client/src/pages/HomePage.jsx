import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import ContributionGrid from "../components/ContributionGrid";
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

export default function HomePage() {
  const [pomodoro, setPomodoro] = useState(1500);
  const [shortBreak, setshortBreak] = useState(300);
  const [longBreak, setlongBreak] = useState(900);

  const [seconds, setSeconds] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  let hidden = isActive ? "block" : "hidden";

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isActive, seconds]);

  const handleStartTimer = (time) => {
    setSeconds(time);
    setIsActive(true);
  };

  const handleStopTimer = (time) => {
    setIsActive(false);
    setSeconds(time);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="mb-20">
      <Tabs
        defaultValue="pomodoro"
        className="w-[400px] mx-auto mt-20 flex flex-col"
      >
        <TabsList className="self-center">
          <TabsTrigger value="pomodoro" onClick={()=> setSeconds(pomodoro)}>Pomodoro</TabsTrigger>
          <TabsTrigger value="shortBreak" onClick={()=> setSeconds(shortBreak)}>Short break</TabsTrigger>
          <TabsTrigger value="longBreak" onClick={()=> setSeconds(pomodoro)}>Long Break</TabsTrigger>
        </TabsList>
        <TabsContent value="pomodoro">
          <Card className="w-[400px] py-10 flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="self-center text-6xl">
                {formatTime(seconds)}
              </CardTitle>
            </CardHeader>
            <div className="flex justify-center gap-4">
              <Button
                className="mt-6 w-1/3 self-center"
                onClick={() => handleStartTimer(pomodoro)}
              >
                Start
              </Button>
              <Button
                className={`mt-6 w-1/3 self-center ${hidden}`}
                onClick={() => handleStopTimer(pomodoro)}
              >
                Reset
              </Button>
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

        {/* <TabsContent value="longBreak">
        <Card className="w-[400px] py-10 flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="self-center text-6xl">{longBreak}</CardTitle>
          </CardHeader>
          <Button className="mt-6 w-1/3 self-center">Start</Button>
        </Card>
      </TabsContent> */}
      </Tabs>

      {/* Contribution grid */}
      <div className="flex flex-wrap gap-10 mt-20 justify-center">
      <ContributionGrid />
      <ContributionGrid />
      </div>
     
    </div>
  );
}
