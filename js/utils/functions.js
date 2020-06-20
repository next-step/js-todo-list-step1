import { ERROR_TYPE, FILTER_NAME, METHOD_NAME } from './constants.js';

export const filteringData = (filterType, data) => {
  const filtering = {
    [FILTER_NAME.ALL]: (data) => data,
    [FILTER_NAME.ACTIVE]: (data) =>
      data.filter((todo) => todo.isCompleted === false),
    [FILTER_NAME.COMPLETED]: (data) =>
      data.filter((todo) => todo.isCompleted === true),
  };
  return filtering[filterType]
    ? filtering[filterType](data)
    : console.error(ERROR_TYPE.NO_MATCH_FILTER);
};

export const controlLocalStorage = (storageName, method, data) => {
  const control = {
    [METHOD_NAME.GET]: (storageName) => {
      try {
        return JSON.parse(localStorage.getItem(storageName));
      } catch (e) {
        console.log(ERROR_TYPE.CAN_NOT_GET_STORAGE);
      }
    },
    [METHOD_NAME.SET]: (storageName, data) => {
      try {
        localStorage.setItem(storageName, JSON.stringify(data));
      } catch (e) {
        console.log(ERROR_TYPE.CAN_NOT_SET_STORAGE);
      }
    },
    [METHOD_NAME.REMOVE]: (storageName) => {
      localStorage.removeItem(storageName);
    },
  };
  return control[method] && control[method](storageName, data);
};
