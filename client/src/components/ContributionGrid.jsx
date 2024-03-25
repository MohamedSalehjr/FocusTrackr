import React, { useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import { format } from "date-fns";
export default function ContributionGrid() {
  // const [date, setDate] = useState<Date | undefined>(today);

  return (
    <Calendar
      // selected={new Date(2023, 5, 8)}
      // selected={date}
      // onSelect={setDate}
      className="rounded-md border"
    />
  );
}
