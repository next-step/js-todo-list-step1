export default class TodoCount {
  constructor({ target }) {
    this.$target = target;
  }

  updateCount(count) {
    const $count = this.$target.querySelector('span > strong');
    $count.innerHTML = count;
  }
}
