import React from 'react';
import { secondsToTime } from '../utils/secondsToTime';

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="Timer">{secondsToTime(props.mainTime)}</div>;
}
