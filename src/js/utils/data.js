/**
 * id 생성하여 투두 데이터 가공
 * @param {string} title
 * @returns {object}
 */

export const todoItem = (title) => {
  return { id: new Date().getTime(), title, complete: false };
};
