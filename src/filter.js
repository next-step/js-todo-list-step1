import { setClassName } from "./utils.js";
import { onChangeFilter } from "./store.js";

const showAll = document.getElementById("show-all");
const showActive = document.getElementById("show-active");
const showCompleted = document.getElementById("show-completed");

const filters = {
  "#": showAll,
  "#active": showActive,
  "#completed": showCompleted,
};
const SELECTED = "selected";

const getSelected = (hash) => {
  return filters[hash] || filters["#"];
};

const resetFilter = () =>
  R.pipe(
    R.values,
    R.forEach((filter) =>
      setClassName(filter)(R.replace(SELECTED, "", filter.className))
    )
  )(filters);

const addSelectToClassName = (selected) =>
  R.pipe(
    R.split(" "),
    R.filter(R.identity),
    R.append(SELECTED),
    R.join(" "),
    setClassName(selected)
  )(selected.className);

const setSelectedFilter = R.pipe(getSelected, addSelectToClassName);

const changeFilter = (hash) => {
  resetFilter();
  setSelectedFilter(hash);
  onChangeFilter();
};

export const initFilter = () => {
  changeFilter(document.location.hash);
  window.onpopstate = () => {
    changeFilter(document.location.hash);
  };
};
