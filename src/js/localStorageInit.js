let localStorageInit = () => {
  //   localStorage.clear();
  if (!localStorage.getItem("TODO")) {
    localStorage.setItem("TODO", []);
  }
  if (!localStorage.getItem("DONE")) {
    localStorage.setItem("DONE", []);
  }
};

export default localStorageInit;
