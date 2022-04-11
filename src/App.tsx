import { useState } from 'react';
import { AppRouter } from '../src/app/router';
import './App.scss';
import { AppContext, DefaultState } from './store/AppContext';
import { IState } from './store/interfaces'

function App() {
  const [state, setState] = useState<IState>(DefaultState);

  const updateState = (value: IState): void => {
    const updatedState = { ...state, ...value };
    setState(updatedState)
  }
  return (
      <AppContext.Provider
        value={{
          state: state,
          updateState: updateState,
        }}>
        <AppRouter />
      </AppContext.Provider>
  );
}

export default App;
