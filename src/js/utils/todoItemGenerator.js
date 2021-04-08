/**
 *
 * @param {string} title
 */

const todoItemGenerator = (title) => {
  return { id: new Date().getTime(), title, complete: false };
};

export default todoItemGenerator;
