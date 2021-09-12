/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';

import { useInterval } from '../hooks/useInterval';
import { secondsToTime } from '../utils/secondsToTime';
import { Button } from './Button';
import { Timer } from './Timer';

const bellStart = require('../sounds/bellStart.mp3');
const bellFinish = require('../sounds/bellFinish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeRunning, setTimeRunning] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesManager, setCyclesManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numbersOfPomodoro, setNumbersOfPomodoro] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeRunning ? 1000 : null,
  );

  const start = () => {
    setTimeRunning(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.pomodoroTime);
    audioStartWorking.play();
  };

  const rest = (long: boolean) => {
    setTimeRunning(true);
    setWorking(false);
    setResting(true);

    long ? setMainTime(props.longRestTime) : setMainTime(props.shortRestTime);

    audioStopWorking.play();
  };

  useEffect(() => {
    if (working) document.body.classList.add('Working');
    if (resting) document.body.classList.remove('Working');

    if (mainTime > 0) return;

    if (working && cyclesManager.length > 0) {
      rest(false);
      cyclesManager.pop();
    } else if (working && cyclesManager.length <= 0) {
      rest(true);
      setCyclesManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumbersOfPomodoro(numbersOfPomodoro + 1);
    if (resting) start();
  }, [
    working,
    resting,
    mainTime,
    rest,
    start,
    cyclesManager,
    setCyclesManager,
    numbersOfPomodoro,
    props.cycles,
    completedCycles,
  ]);

  return (
    <div className="Pomodoro">
      {resting ? (
        <h2>...take some rest, you earn it...</h2>
      ) : (
        <h2>...don&apos;t give up...</h2>
      )}

      <Timer mainTime={mainTime} />

      <div className="Controls">
        <Button text="working" onClick={() => start()}></Button>
        <Button text="resting" onClick={() => rest(false)}></Button>
        <Button
          text={timeRunning ? 'pause' : 'play'}
          onClick={() => setTimeRunning(!timeRunning)}
        ></Button>
      </div>

      <div className="details">
        <p>completed cycles: {completedCycles} </p>
        <p>worked hours: {secondsToTime(fullWorkingTime)} </p>
        <p>completed pomodoro: {numbersOfPomodoro} </p>
      </div>
    </div>
  );
}
