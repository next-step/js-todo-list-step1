// const $app = document.querySelector('#app');
console.clear();

let state = {
  items: ['item1', 'item2', 'item3', 'item4'],
};

const render = () => {
  const { items } = state;
  setState({ items: [...items, `item${items.length + 1}`] }); // ❗️ 구조 분해 할당('...'로 나머지 요소 가져오기),
};

const setState = (newState) => {
  state = { ...state, ...newState };
  console.log(state);
};

render();
