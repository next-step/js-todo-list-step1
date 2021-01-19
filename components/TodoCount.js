export const TodoCount = ({ count }) => {
  const span = document.createElement('span');
  span.innerHTML = `총 <strong>${count} 개`;
  return span;
};
