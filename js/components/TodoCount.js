function TodoCount(target, data) {
  this.target = target;
  this.data = data;

  const Count = this.target.querySelector(".count-container");
  const allCount = Count.querySelector("strong");

  this.setState = newData => {
    this.data = newData;
    this.counting();
  };

  this.counting = () => {
    allCount.innerText = this.data.length;
  };

  this.counting();
}

export default TodoCount;
