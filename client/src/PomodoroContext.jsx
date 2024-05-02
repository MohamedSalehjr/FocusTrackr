import { createContext, useState, useEffect } from 'react';
import React from 'react'


export const PomodoroContext = createContext();


export function PomodoroProvider({ children }) {

  const [pomodoro, setPomodoro] = useState(1500)
  const [shortBreak, setShortBreak] = useState(900)
  const [longBreak, setLongBreak] = useState(300)
  const changePomodoro = (pomo) => {
    pomo = pomo * 60;
    setPomodoro(pomo);
  }

  const changeShortBreak = (pomo) => {
    pomo = pomo * 60;
    setShortBreak(pomo);
  }
  const changeLongBreak = (pomo) => {
    pomo = pomo * 60;
    setLongBreak(pomo);
  }


  return (
    <PomodoroContext.Provider value={{ pomodoro, shortBreak, longBreak, changePomodoro, changeLongBreak, changeShortBreak, setPomodoro }}>{children}</PomodoroContext.Provider>
  )
}



export default PomodoroContext;
