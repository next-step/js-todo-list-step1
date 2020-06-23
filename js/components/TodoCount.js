const isCountInteger = data => {
  return data && Number.isInteger(data) && data >= 0;
};

export default class TodoCount {
  constructor({ $element, count }) {
    if (!isCountInteger(count)) {
      console.log('[TodoCount] 데이터가 올바르지 않습니다.');
      return;
    }

    this.$element = $element;
    this.count = count;

    this.render();
  }

  render() {
    this.$element.innerHTML = `총 <strong>${this.count}</strong> 개`;
  }

  setState(newCount) {
    this.count = newCount;
    this.render();
  }
}
