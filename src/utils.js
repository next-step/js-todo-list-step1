export const makeElement = (tagName, options) => {
  const el = document.createElement(tagName);
  R.pipe(
    R.toPairs,
    R.forEach(([key, val]) => (el[key] = val))
  )(options);
  return el;
};

export const setClassName = (el) => (className) => {
  el.className = className;
};

export const addClassName = (el) => (className) =>
  R.pipe(
    R.split(" "),
    R.append(className),
    R.uniq,
    R.join(" "),
    setClassName(el)
  )(el.className);

export const removeClassName = (el) => (className) =>
  R.pipe(
    R.split(" "),
    R.filter(R.complement(R.equals(className))),
    R.join(" "),
    setClassName(el)
  )(el.className);
