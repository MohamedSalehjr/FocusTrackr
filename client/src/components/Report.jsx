import CalendarHeatmap from "react-calendar-heatmap";
import { useState, useEffect } from "react";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
// import "../../styles/style.css"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const Report = () => {
  const current = new Date();
  let extractedData;
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch operation
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/pomo/u1");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // console.log(data);
    };

    fetchData(); // Call the fetch function
    // if (data != null) {
    // }
    // const extractedData = data.pomo.map((item) => {
    //   return {
    //     date: item.date,
    //     count: item.count,
    //   };
    //   console.log(extractedData);

    // });

    // console.log(extractedData);
    // Cleanup function (not needed here since we're not subscribing to any resources)
  }, []);

  if (!data) {
    // handle empty response
  } else if (data.error) {
    // handle error
  } else {
    // process results
    // console.log(
    //   data.pomo.map((item) => {
    //     return {
    //       date: item.date,
    //       count: item.count,
    //     };
    //   })
    // );

    extractedData = data.pomo.map((item) => {
      return {
        date: item.date,
        count: item.count,
      };
    });

    console.log(extractedData[0]);
  }

  const today = `${current.getFullYear()}-${
    current.getMonth() + 1
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
              <CardTitle className="self-center text-5xl">23 hrs</CardTitle>
              <CardDescription className="self-center">
                Total Time focused
              </CardDescription>
            </CardHeader>
          </Card>
          <DialogHeader>
            <DialogTitle>Heatmap</DialogTitle>
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
