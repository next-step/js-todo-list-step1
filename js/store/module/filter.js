import { FILTER } from "../../utils/constants.js";

const filter = (() => {
  let state = FILTER.ALL;

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
    state = newState;
  };

  const getFilter = () => {
    return state;
  };

  initFilter();

  return {
    getFilter,
    setFilter,
  };
})();

export default filter;
