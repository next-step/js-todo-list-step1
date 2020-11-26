const setLocalStorage = (param) => {
  console.log(param);
  localStorage.setItem(param.id, JSON.stringify(param));
};

const createLocalStorageArray = () => {
  let array = [];
  for (let index = 0; index < localStorage.length; index++) {
    array.push(JSON.parse(localStorage.getItem(index)));
  }
  return array;
};

const createLocalStorageObject = () => {
  let array = [];
  for (let index = 0; index < localStorage.length; index++) {
    array.push(JSON.parse(localStorage.getItem(index)));
  }
  return array;
};

export { setLocalStorage, createLocalStorageArray, createLocalStorageObject };
