
import { React, useState } from "react"
import { Calendar } from "../../components/ui/calendar"


export default function ContributionGrid () {
    // const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        // selected={date}
        // onSelect={setDate}
        className="rounded-md border"
      />
    )
    
}