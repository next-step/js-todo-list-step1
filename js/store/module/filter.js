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
      setFilter(FILTER.ACTIVE);
    } else if (location.hash.includes(FILTER.COMPLETED)) {
      setFilter(FILTER.COMPLETED);
    } else {
      setFilter(FILTER.ALL);
    }
  };

  const setFilter = (newState) => {
    filter.state = newState;
  };

  const getFilter = () => {
    return state;
  };

  return {
    initFilter,
    defineSetter,
    getFilter,
    setFilter,
  };
})();

export default filter;
