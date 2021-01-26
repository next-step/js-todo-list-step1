const FILTER = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const findFilterByClassList = (classList) => {
  return Object.values(FILTER).find((value) => classList.contains(value));
};

export { FILTER, findFilterByClassList };
