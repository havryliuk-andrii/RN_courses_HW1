import React from 'react';
import {DataProvider} from './src/contexts';
import Main from './src/pages/Main';

const App = () => {
  return (
    <DataProvider>
      <Main />
    </DataProvider>
  );
};

export default App;
