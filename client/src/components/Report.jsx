import CalendarHeatmap from "react-calendar-heatmap";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from 'react-tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, DialogTrigger,
} from "../../components/ui/dialog";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Value } from "@radix-ui/react-select";

const Report = () => {

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const current = new Date();
  const { user } = useUser();
  let extractedData;
  let extractedTotalTime;
  let todaysTotalTime = 0;
  const [todaysPomo, setTodaysPomo] = useState(null);
  const [data, setData] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const userid = user?.id;
  const [tooltip, setTooltip] = useState();
  const [tooltipDate, setTooltipDate] = useState();
  const [tooltipActive, setTooltipActive] = useState(false);

  // Fetch operation
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${backendURL}/pomo/${userid}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch(
        `${backendURL}/users/${userid}`
      );
      const time = await response.json();
      setTotalTime(time);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch(
        `${backendURL}/pomo/today/${userid}`
      );
      const todaysTime = await response.json();
      setTodaysPomo(todaysTime);
      // console.log(todaysTime)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };


  useEffect(() => {
    fetchData();
  }, [])


  if (!data) {
    // handle empty response
  } else if (data.error) {
    // handle error
  } else {
    extractedData = data.pomo.map((item) => {
      return {
        date: item.date,
        count: item.count,
      };
    });

    // console.log(extractedData[0]);
  }

  if (!totalTime) {
  } else if (totalTime.error) {
  } else {
    extractedTotalTime = totalTime.user.hours;
  }

  if (todaysPomo) {
    if (todaysPomo.pomo.length == 0) {
    } else {
      todaysTotalTime = todaysPomo.pomo[0].hours;
    }
  }

  const today = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;
  // console.log(current);
  // console.log(today);
  //
  return (
    <>
      <Dialog>
        <DialogTrigger className="text-textcolor"  > Report</DialogTrigger>
        <DialogContent>
          <div className="flex p-8 gap-4">
            <Card className="w-1/2 mx-auto">
              <CardHeader className="">
                <CardTitle className="self-center text-5xl">
                  {todaysTotalTime}
                </CardTitle>
                <CardDescription className="self-center">
                  Total minutes today
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="w-1/2 mx-auto">
              <CardHeader className="">
                <CardTitle className="self-center text-5xl">
                  {extractedTotalTime}
                </CardTitle>
                <CardDescription className="self-center">
                  Total minutes focused
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <DialogHeader>
            <DialogTitle>Pomo Grid</DialogTitle>
          </DialogHeader>
          <CalendarHeatmap
            className=""
            startDate={new Date("2024-01-01")}
            endDate={new Date("2024-12-30")}
            values={extractedData}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-github-${value.count}`;
            }}
            onMouseOver={(event, value) => {
              if (value !== null && typeof value !== 'undefined' && value.count !== null && typeof value.count !== 'undefined') {
                setTooltipActive(true)
                setTooltipDate(value.date)
                setTooltip(value.count)
              } else {
                setTooltipDate("No")
                setTooltip("")
              }
            }}
            showWeekdayLabels={true}
            tooltipDataAttrs={(value) => {
              return { 'data-tooltip': 'Pomos:' + value.count }
            }}
            data-tooltip-id="data-tooltip"
            data-tooltip-content="hello" />
          <Tooltip id="data-tooltip" />

          <Card className={`w-1/2 mx-auto ${tooltipActive ? '' : 'hidden'} `}>
            <CardHeader className="">
              <CardDescription className="self-center">
                {`${tooltipDate} Pomos: ${tooltip}`}
              </CardDescription>
            </CardHeader>
          </Card>


        </DialogContent>
      </Dialog>
    </>
  );
};

export default Report;
