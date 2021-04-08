/**
 *
 * @param {string} title
 */

const todoItemGenerator = (title) => {
  return { id: new Date().getTime(), title };
};

export default todoItemGenerator;
