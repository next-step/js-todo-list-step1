import { ERRORTYPE, FILTERNAME } from './constants.js';

export const filteringData = (filterType, data) => {
  let filteredData = undefined;

  switch (filterType) {
    case FILTERNAME.ALL:
      filteredData = data;
      break;
    case FILTERNAME.ACTIVE:
      filteredData = data.filter(
        (todo) => todo.isCompleted === false,
      );
      break;
    case FILTERNAME.COMPLETED:
      filteredData = data.filter(
        (todo) => todo.isCompleted === true,
      );
      break;
    default:
      console.error(ERRORTYPE.NOMATCHFILTER);
      break;
  }
  return filteredData
}