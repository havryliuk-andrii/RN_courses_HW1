export const selectData = data => {
  return data.map(({id, title, url}) => ({id, title, url}));
};
