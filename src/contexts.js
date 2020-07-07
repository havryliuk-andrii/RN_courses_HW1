import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {getInitialData} from './api';
import {Storage} from './utils/storage';

export const DataContext = React.createContext(null);

export const DataProvider = ({children}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      // await Storage.clearAppData();
      let initialData = await Storage.getJSON(Storage.store.data);

      if (!initialData) {
        initialData = await getInitialData();
        await Storage.setJSON(Storage.store.data, initialData);
      }
      setData(initialData);
    })();
  }, []);

  if (!data) {
    return <Text>no data</Text>;
  }

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
