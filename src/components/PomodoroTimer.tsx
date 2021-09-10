/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';

import { useInterval } from '../hooks/useInterval';
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
  cicles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeRunning, setTimeRunning] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('Working');
    if (resting) document.body.classList.remove('Working');
  }, [working]);

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
    </div>
  );
}
