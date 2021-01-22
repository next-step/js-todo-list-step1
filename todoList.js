const $TodoInput = document.querySelector('#new-todo-title'); // 
const $TodoList = document.querySelector('#todo-list');

function init() {
    $TodoInput.addEventListener('keypress', addTodo);

};

let TodoItemList = []; // $TodoInput에 입력되는 내용들을 저장

const addTodo = (e) => {
    
    if(e.key === 'Enter') { // Enter키가 눌렸을 경우
        e.preventDefault();

        const TodoItem = $TodoInput.value;
    
        if(TodoItem.lenght !== 0) {
            TodoItemList.push(TodoItem);
            addList(TodoItemList);
        }

        $TodoInput.value = '';
    }
}

const addList = (TodoItemList) => { // 입력된 내용을 항목 추가
    $TodoList.innerHTML = '';

    TodoItemList.forEach(function(item) {

    $TodoList.insertAdjacentHTML('beforeend', // ul의 요소가 끝나기 전에 내용 삽입
    `
    <li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${item}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>
  <li class="editing hidden">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label class="label">${item}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item}" />
  </li>
  <li class="completed hidden">
    <div class="view">
      <input class="toggle" type="checkbox" checked/>
      <label class="label">${item}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item}" />
  </li>
    `);
});

};


init();