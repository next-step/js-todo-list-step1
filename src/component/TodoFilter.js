export const filterTypes = [
  { type: 'all', text: '전체보기' },
  { type: 'active', text: '해야할 일' },
  { type: 'completed', text: '완료한 일' },
];

export class TodoFilter {

  target;

  constructor(target) {
    this.target = target;
  }

  render(filerType) {
    this.target.innerHTML = types.map(({ type, text }) => `
      <li>
        <a class="${type} ${filerType === type ? 'selected' : ''}" href="#">${text}</a>
      </li>
    `);

  }

}