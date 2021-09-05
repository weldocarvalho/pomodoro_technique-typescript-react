import React from 'react';

import { PomodoroTimer } from './components/PomodoroTimer';

function App(): JSX.Element {
  return (
    <div className="Wrapper">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cicles={4}
      ></PomodoroTimer>
    </div>
  );
}

export default App;
