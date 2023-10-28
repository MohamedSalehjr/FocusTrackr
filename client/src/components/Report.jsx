import CalendarHeatmap from "react-calendar-heatmap";
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
  const today = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
  // console.log(
  // `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`
  // );

  return (
    <>
      <Dialog>
        <DialogTrigger className={` `}> Report</DialogTrigger>
        <DialogContent>
          <Card className="w-1/2 mx-auto">
            <CardHeader className="">
              <CardTitle className="self-center text-5xl">23 hrs</CardTitle>
              <CardDescription className="self-center">Total Time focused</CardDescription>
            </CardHeader>
  
          </Card>
          <DialogHeader>
            <DialogTitle>Heatmap</DialogTitle>
          </DialogHeader>
          <CalendarHeatmap
            className=""
            startDate={new Date("2023-01-01")}
            endDate={new Date("2023-12-30")}
            values={[
              { date: "2023-01-01", count: 1 },
              { date: "2023-01-22", count: 2 },
              { date: "2023-01-30", count: 3 },
              { date: today, count: 5 },
            ]}
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
