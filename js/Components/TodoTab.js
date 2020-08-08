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
    if (clickedTab.includes('selected')) return;

    onChangeTab(clickedTab);
  };

  this.setState = (nextSeletedTab) => {
    this.selectedTab = nextSeletedTab;

    this.render();
  };

  this.render = () => {
    for (const tab of this.$tabs) {
      if (tab.classList.contains('selected')) {
        tab.classList.remove('selected');
      }

      if (tab.classList.contains(this.selectedTab)) {
        tab.classList.add('selected');
      }
    }
  };

  this.init();
}

export default TodoTab;
