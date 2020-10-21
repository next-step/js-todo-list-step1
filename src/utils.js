export const makeElement = (tagName, options) => {
  const el = document.createElement(tagName);
  R.pipe(
    R.toPairs,
    R.forEach(([key, val]) => (el[key] = val))
  )(options);
  return el;
};
