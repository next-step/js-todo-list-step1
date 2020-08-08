import { TAB } from '../utils/constant.js';

function TodoTab({ $target, selectedTab, onChangeTab }) {
  this.init = () => {
    this.$target = $target;
    this.$tabs = this.$target.querySelectorAll('a');
    this.selectedTab = selectedTab;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    e.preventDefault();
    if (e.target.nodeName !== 'A') return;

    const clickedTab = e.target.className;
    if (clickedTab.includes(TAB.SELECTED_CLASS)) return;

    onChangeTab(clickedTab);
  };

  this.setState = (nextSeletedTab) => {
    this.selectedTab = nextSeletedTab;

    this.render();
  };

  this.render = () => {
    for (const tab of this.$tabs) {
      if (tab.classList.contains(TAB.SELECTED_CLASS)) {
        tab.classList.remove(TAB.SELECTED_CLASS);
      }

      if (tab.classList.contains(this.selectedTab)) {
        tab.classList.add(TAB.SELECTED_CLASS);
      }
    }
  };

  this.init();
}

export default TodoTab;
