import CalendarHeatmap from "react-calendar-heatmap";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const Report = () => {
  const current = new Date();
  const { user } = useUser();
  let extractedData;
  let extractedTotalTime;
  const [data, setData] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const userid = user?.id;

  useEffect(() => {
    // Fetch operation
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/pomo/${userid}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${userid}`
        );
        const time = await response.json();
        setTotalTime(time);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function
  }, []);

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

  const today = `${current.getFullYear()}-${current.getMonth() + 1
    }-${current.getDate()}`;
  console.log(current);
  console.log(today);

  return (
    <>
      <Dialog>
        <DialogTrigger className={` `}> Report</DialogTrigger>
        <DialogContent>
          <Card className="w-1/2 mx-auto">
            <CardHeader className="">
              <CardTitle className="self-center text-5xl">
                {extractedTotalTime}
              </CardTitle>
              <CardDescription className="self-center">
                Total Time focused
              </CardDescription>
            </CardHeader>
          </Card>
          <DialogHeader>
            <DialogTitle>Focus Grid</DialogTitle>
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
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Report;
