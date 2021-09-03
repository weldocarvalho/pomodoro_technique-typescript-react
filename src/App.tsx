import React from 'react';

import { PomodoroTimer } from './components/PomodoroTimer';

function App(): JSX.Element {
  return (
    <div>
      <PomodoroTimer defaultPomodoroTime={1500}></PomodoroTimer>
    </div>
  );
}

export default App;
