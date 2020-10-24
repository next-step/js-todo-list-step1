const dispatch = (store) => {
  localStorage.setItem("store", JSON.stringify(store));
};

const subscribe = () => {
  return JSON.parse(localStorage.getItem("store"));
};

export { dispatch, subscribe };
