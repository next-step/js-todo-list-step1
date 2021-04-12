let deleteValue = (value, key) => {
  let data = localStorage.getItem(key);
  let dataArr = data.split(",");
  if (dataArr.includes(value)) {
    dataArr.splice(dataArr.indexOf(value), 1);
    localStorage.setItem(key, [dataArr]);
  }
};

let pushValue = (value, key) => {
  let data = localStorage.getItem(key);
  if (data !== "") {
    let dataArr = data.split(",");
    dataArr.push(value);
    value = dataArr;
  }
  localStorage.setItem(key, [value]);
};

export { deleteValue, pushValue };
