export const defaultItem = text => ({
  id: Date.now().toString(),
  text,
  completed: false,
  editing: false
});

export const validateType = (data, type) => {
  if (typeof data === type) {
    if (type === 'number' && isNaN(data)) {
      return false;
    }
    return true;
  }
  return false;
}

// for running test
// module.exports = validateType;