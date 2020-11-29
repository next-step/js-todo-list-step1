import { FILTER } from "../../utils/constants.js";

const filter = (() => {
  let state = FILTER.ALL;

  const setFilter = (newState) => {
    state = newState;
  };

  const getFilter = () => {
    return state;
  };

  return {
    getFilter,
    setFilter,
  };
})();

export default filter;
