/**
 * @param {string} title
 * @returns {object}
 */

const todoItemGenerator = (title) => {
  return { id: new Date().getTime(), title, complete: false };
};

export default todoItemGenerator;
