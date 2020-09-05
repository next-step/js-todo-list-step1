const FilterOptions = [
  {type: 'all', text: '전체보기'},
  {type: 'active', text: '해야할 일'},
  {type: 'completed', text: '완료한 일'},
];

export default function TodoFilter($todoFilter, data) {
  this.$todoFilter = $todoFilter;
  this.data = data;
  this.selected = 'all';

  this.init = () => {
    this.render();
    this.bind();
  };

  this.bind = () => {
    this.$todoFilter.addEventListener('click', ({target}) => {
        FilterOptions.filter(({type}) => {
            if (target.classList.contains(type)){
                this.selected = type;
            }
        });

        this.render();
    });
  };

  this.render = () => {
    let result = '';
    FilterOptions.map(({type, text}) => {
      result += `
        <li>
          <a class="${type} ${this.selected == type? 'selected': ''}" href="#${type}">${text}</a>
        </li>
        `;
    });

    this.$todoFilter.innerHTML = result;
  };

  this.init();
}
