import { useState } from 'react';
import { AppRouter } from '../src/app/router';
import './App.scss';
import { AppContext, DefaultState } from './store/AppContext';
import { IState } from './store/interfaces'

function App() {
  const [state, setState] = useState<IState>(DefaultState);
  return (
      <AppContext.Provider
        value={{
          state: state,
        }}>
        <AppRouter />
      </AppContext.Provider>
  );
}

export default App;
