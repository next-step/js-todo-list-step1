export default function TotalCount($todoCount, totalCount) {
  const render = (totalCount) => {
    $todoCount.innerHTML = `총 <strong>${totalCount}</strong> 개`;
  };

  render(totalCount);

  return {render};
}
