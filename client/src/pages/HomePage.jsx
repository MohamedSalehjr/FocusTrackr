import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import ContributionGrid from "../components/ContributionGrid";
import CalendarHeatmap from "react-calendar-heatmap";
// import "react-calendar-heatmap/dist/styles.css" ;
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

  const handleNewHabit = () => {};

  return (
    <div className="mb-20 flex flex-col">
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

      <Dialog>
        <DialogTrigger
            className={`mt-10 w-1/5 self-center border py-2 px-4 border-1 rounded-md hover:bg-gray-100 `}>
          {" "}
          
            {/* variant="outline"
            className={`mt-10 w-1/5 self-center`} */}
            View Heatmap
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Heatmap</DialogTitle>
          </DialogHeader>
          <CalendarHeatmap
            className=""
            startDate={new Date("2023-01-01")}
            endDate={new Date("2023-12-30")}
            values={[
              { date: "2023-01-01", count: 12 },
              { date: "2023-01-22", count: 122 },
              { date: "2023-01-30", count: 38 },
              // ...and so on
            ]}
          />
        </DialogContent>
      </Dialog>

   
        <iframe className="mt-10 mx-auto rounded-lg max-w-md" src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      
    </div>
  );
}
