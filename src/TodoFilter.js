'use strict';

export default class Filter {
  constructor() {
    this.$filter = document.querySelector('.filters');
    this.$filter.addEventListener('click', this.onClickListener);
  }

  onClickListener = event => {
    const target = event.target;
    if (!target.matches('a') || target.matches('.selected')) return;
    this.changeBtn(target);
    this.onClick && this.onClick(event);
  };

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  changeBtn(targetBtn) {
    const $selectedBtn = this.$filter.querySelector('.selected');
    $selectedBtn.classList.remove('selected');
    targetBtn.classList.add('selected');
  }
}
