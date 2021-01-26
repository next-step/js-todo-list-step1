const $TodoInput = document.querySelector('#new-todo-title'); 
const $TodoList = document.querySelector('#todo-list');
const $allTodo = document.querySelector('a.all');
const $activeTodo = document.querySelector('a.active');
const $completedTodo = document.querySelector('a.completed');
const $TodoCount = document.querySelector('span > strong');

function init() {
  $TodoInput.addEventListener('keypress', addTodo);
  $TodoList.addEventListener('click', handleTodo);
  $TodoList.addEventListener('dblclick', editTodo);
  $allTodo.addEventListener('click', allShow);
  $completedTodo.addEventListener('click', completedShow);
  $activeTodo.addEventListener('click', activeShow);
  
};

let TodoItemList = []; // $TodoInput에 입력되는 내용들을 저장
let TodoNum = 0; // 총 개수

const addTodo = (e) => {
    
    if(e.key === 'Enter') { // Enter키가 눌렸을 경우
        e.preventDefault();

        const TodoItemName = $TodoInput.value;
    
        if(TodoItemName.lenght !== 0) {
            TodoItemList.push(TodoItemName);
            addList(TodoItemList);
        }

        $TodoInput.value = '';
        TodoNum++;
        $TodoCount.textContent = TodoNum;
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
        <input class="edit" value="${item}" />
      </li>
    `);
  });
  
};

const handleTodo = ({target}) => { // 완료 & 삭제
  //if(target.className !== 'toggle') return;
  if(target.classList.contains('toggle')) {
    
    const $TodoItem = target.closest('li');

    if($TodoItem.className !== 'completed') {
      $TodoItem.setAttribute('class', 'completed');
      target.setAttribute('checked', '');
    }
    else {
      $TodoItem.removeAttribute('class','completed');
      target.removeAttribute('checked');
    }
  }
  
  if(target.classList.contains('destroy')) {
    TodoNum--;
    $TodoCount.textContent = TodoNum;

    const $TodoItem = target.parentNode.parentNode;
    $TodoList.removeChild($TodoItem);

    TodoItemList = TodoItemList.filter(function(item) {
      return item !== $TodoItem.querySelector('label').textContent;
  });
  
  }

}

const editTodo = ({target}) => { // 수정
  if(target.className !== 'label') return;

  const $TodoItem = target.closest('li');
  const editInput = $TodoItem.querySelector('.edit');

  if($TodoItem.className !== 'editing') {
    $TodoItem.setAttribute('class', 'editing');
    editInput.value = target.textContent;
  }

  editInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      $TodoItem.removeAttribute('class','editing');
      target.textContent = editInput.value;
    }
    else if(e.key === 'Escape') {
      $TodoItem.removeAttribute('class','editing');
    }

  });
}

const allShow = () => { // 전체보기
  $allTodo.classList.add('selected');

  if($activeTodo.classList.contains('selected')) {
    $activeTodo.classList.remove('selected');
  }
  if($completedTodo.classList.contains('selected')) {
    $completedTodo.classList.remove('selected');
  }

  const $TodoItems = document.querySelectorAll('li');

  $TodoItems.forEach(function(TodoItem) {
    TodoItem.classList.remove('hidden');
  });
}

const activeShow = () => { // 해야할 일
  $activeTodo.classList.add('selected');

  if($allTodo.classList.contains('selected')) {
    $allTodo.classList.remove('selected');
  }
  if($completedTodo.classList.contains('selected')) {
    $completedTodo.classList.remove('selected');
  }

  const $TodoItems = document.querySelectorAll('li');

  $TodoItems.forEach(function(TodoItem) {
    if(TodoItem.classList.contains('completed')) {
      TodoItem.classList.add('hidden');
    }
    else {
      TodoItem.classList.remove('hidden');
    }
    
  });
}

const completedShow = () => { // 완료한 일
  $completedTodo.classList.add('selected');

  if($allTodo.classList.contains('selected')) {
    $allTodo.classList.remove('selected');
  }
  if($activeTodo.classList.contains('selected')) {
    $activeTodo.classList.remove('selected');
  }
  const $TodoItems = document.querySelectorAll('li');

  $TodoItems.forEach(function(TodoItem) {
    if(TodoItem.classList.contains('completed')) {
      TodoItem.classList.remove('hidden');
    }
    else {
      TodoItem.classList.add('hidden');
    }
  });
}





init();