const validateType = (data, type) => {
  if (typeof data === type) {
    if (type === 'number' && isNaN(data)) {
      return false;
    }
    return true;
  }
  return false;
}

// export default {
//   validateType
// };
// for running test
module.exports = validateType;