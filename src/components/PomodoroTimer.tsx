import React, { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import { Button } from './Button';
import { Timer } from './Timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cicles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="Pomodoro">
      <h2>...don&apos;t give up...</h2>
      <Timer mainTime={mainTime} />

      <div className="Controls">
        <Button text="btn"></Button>
        <Button text="btn"></Button>
      </div>
    </div>
  );
}
