export default function TodoCount($todoCount, totalCount) {
  this.$todoCount = $todoCount;
  this.totalCount = totalCount;

  this.render = (totalCount) => {
    this.totalCount = totalCount;
    this.$todoCount.innerHTML = `총 <strong>${this.totalCount}</strong> 개`;
  };

  this.render(this.totalCount);
}
