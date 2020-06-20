const validateType = (data, type) => {
  if (typeof data === type) {
    return true;
  }
  return false;
}

module.exports = validateType;