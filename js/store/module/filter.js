import { FILTER } from "../../utils/constants.js";

const filter = (() => {
  let state = FILTER.ALL;

  const defineSetter = (method) => {
    Object.defineProperty(filter, "state", {
      set: function (value) {
        state = value;
        method();
      },
    });
  };

  const initFilter = () => {
    if (location.hash.includes(FILTER.ACTIVE)) {
      state = FILTER.ACTIVE;
    } else if (location.hash.includes(FILTER.COMPLETED)) {
      state = FILTER.COMPLETED;
    } else {
      state = FILTER.ALL;
    }
  };

  const isAll = () => {
    return state === FILTER.ALL;
  };

  const isActive = () => {
    return state === FILTER.ACTIVE;
  };

  const isCompleted = () => {
    return state === FILTER.COMPLETED;
  };

  const setFilter = (newState) => {
    filter.state = newState;
  };

  const getFilter = () => {
    return state;
  };

  initFilter();

  return {
    defineSetter,
    isAll,
    isActive,
    isCompleted,
    getFilter,
    setFilter,
  };
})();

export default filter;
