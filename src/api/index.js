import axios from 'axios';
import {selectData} from './dal';

export const getInitialData = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/photos');
  return selectData(res.data.slice(0, 10));
};

export const getMoreData = async page => {
  const res = await axios.get(
    `http://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`,
  );
  return selectData(res.data);
};
