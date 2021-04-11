/**
 * @param {string} title
 * @returns {object}
 */

export const todoItem = (title) => {
  return { id: new Date().getTime(), title, complete: false };
};
