import { ERRORTYPE, FILTERNAME } from './constants.js';

export const filteringData = (filterType, data) => {
  const filtering = {
    [FILTERNAME.ALL]: (data) => data,
    [FILTERNAME.ACTIVE]: (data) =>
      data.filter((todo) => todo.isCompleted === false),
    [FILTERNAME.COMPLETED]: (data) =>
      data.filter((todo) => todo.isCompleted === true),
  };
  return filtering[filterType]
    ? filtering[filterType](data)
    : console.error(ERRORTYPE.NOMATCHFILTER);
};
