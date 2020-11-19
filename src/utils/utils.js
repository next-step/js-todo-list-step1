export const parseHash = (href) => {
  return href.split('#').pop();
};

export const getDataAttribute = (str) => {
  return lowercaseFirstLetter(str.slice('data'.length));
};

const lowercaseFirstLetter = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
