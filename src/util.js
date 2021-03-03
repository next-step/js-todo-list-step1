const generateKey = () => {
  return new Date().valueOf().toString();
};

export { generateKey };
