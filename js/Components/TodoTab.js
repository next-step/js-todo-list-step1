import { CLASS_NAME, NODE_NAME } from '../utils/constant.js';

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
    if (e.target.nodeName !== NODE_NAME.A) return;

    const clickedTab = e.target.className;
    if (clickedTab.includes(CLASS_NAME.SELECTED)) return;

    onChangeTab(clickedTab);
  };

  this.setState = (nextSeletedTab) => {
    this.selectedTab = nextSeletedTab;

    this.render();
  };

  this.render = () => {
    for (const tab of this.$tabs) {
      if (tab.classList.contains(CLASS_NAME.SELECTED)) {
        tab.classList.remove(CLASS_NAME.SELECTED);
      }

      if (tab.classList.contains(this.selectedTab)) {
        tab.classList.add(CLASS_NAME.SELECTED);
      }
    }
  };

  this.init();
}

export default TodoTab;
