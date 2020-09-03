export const filterTypes = [
  { type: 'all', text: '전체보기' },
  { type: 'active', text: '해야할 일' },
  { type: 'completed', text: '완료한 일' },
];

export class TodoFilter {

  #target; #props;

  constructor(target, props) {
    this.#target = target;
    this.#props = props;
    this.#setEvent();
  }

  render(filerType) {
    this.#target.innerHTML = filterTypes.map(({ type, text }) => `
      <li>
        <a class="${type} ${filerType === type ? 'selected' : ''}" href="#" data-type="${type}">${text}</a>
      </li>
    `).join('');
  }

  #setEvent () {
    this.#target.addEventListener('click', event => {
      event.preventDefault();
      const { target } = event;
      if (target.tagName === 'A') {
        this.#props.selectFilter(target.dataset.type);
      }
    })
  }
}