const $TodoInput = document.querySelector('#new-todo-title'); 
const $TodoList = document.querySelector('#todo-list');
const $AllTodo = document.querySelector('a.all');
const $ActiveTodo = document.querySelector('a.active');
const $CompletedTodo = document.querySelector('a.completed');
const $TodoCount = document.querySelector('span > strong');

function init() {
  $TodoInput.addEventListener('keypress', AddTodo);
  $TodoList.addEventListener('click', CompletedTodo);
  $TodoList.addEventListener('click', DestroyTodo);
  $TodoList.addEventListener('dblclick', EditTodo);
  $AllTodo.addEventListener('click', AllTodoShow);
  $CompletedTodo.addEventListener('click', CompletedTodoShow);
  $ActiveTodo.addEventListener('click', ActiveTodoShow);
};

let TodoItemList = []; // $TodoInput에 입력되는 내용들을 저장
$TodoCount.innerHTML = TodoItemList.length;

const AddTodo = (e) => {
    
    const TodoItemName = $TodoInput.value;

    if(e.key === 'Enter' && TodoItemName.length !== 0) { // Enter키가 눌렸을 경우
        e.preventDefault();

        TodoItemList.push(TodoItemName);
        AddList(TodoItemList);
        setLocalStorage(TodoItemList);

        $TodoCount.textContent = TodoItemList.length;
        $TodoInput.value = '';
        
    }
}

const AddList = (TodoItemList) => { // 입력된 내용을 항목 추가
  $TodoList.innerHTML = '';

  TodoItemList.forEach((item) => {

    const TodoTemplate = (item) => {
      return `
      <li>
      <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${item}</label>
      <button class="destroy"></button>
      </div>
      <input class="edit" value="${item}" />
      </li>
      `
    };
    
    $TodoList.insertAdjacentHTML('beforeend', TodoTemplate(item));
  });
};

const CompletedTodo = ({target}) => {
  //if(target.className !== 'toggle') return;
  
  if(target.classList.contains('toggle')) {
    
    const $TodoItem = target.parentNode.parentNode;

    if($TodoItem.classList.contains('completed')) {
      $TodoItem.classList.toggle('completed');
      target.setAttribute('checked', '');
    }
    else {
      $TodoItem.classList.toggle('completed');
      target.removeAttribute('checked');
    }
  }
}

const DestroyTodo = ({target}) => {

  if(target.classList.contains('destroy')) {

    const $TodoItem = target.closest('li');
    $TodoList.removeChild($TodoItem);

    TodoItemList = TodoItemList.filter((item) => {
      return item !== $TodoItem.querySelector('label').textContent;
    });
  
    $TodoCount.textContent = TodoItemList.length;
    setLocalStorage(TodoItemList);
  }
}

const EditTodo = ({target}) => { // 수정
  if(target.classList.contains('label')) {

  const $TodoItem = target.closest('li');
  const editInput = $TodoItem.querySelector('.edit');

  if(!$TodoItem.classList.contains('editing')) {
    $TodoItem.classList.toggle('editing');
  }

  editInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
      $TodoItem.classList.toggle('editing');
      target.textContent = editInput.value;
      setLocalStorage(TodoItemList);
    }
    else if(e.key === 'Escape') {
      $TodoItem.classList.toggle('editing');
    }
  });
}
}

const AllTodoShow = () => { // 전체보기
  $TodoCount.textContent = TodoItemList.length;
  
  $AllTodo.classList.add('selected');

  if($ActiveTodo.classList.contains('selected')) {
    $ActiveTodo.classList.remove('selected');
  }
  if($CompletedTodo.classList.contains('selected')) {
    $CompletedTodo.classList.remove('selected');
  }

  const $TodoItems = document.querySelectorAll('li');

  $TodoItems.forEach((TodoItem) => {
    TodoItem.classList.remove('hidden');
  });
}

const ActiveTodoShow = () => { // 해야할 일
  $ActiveTodo.classList.add('selected');

  if($AllTodo.classList.contains('selected')) {
    $AllTodo.classList.remove('selected');
  }
  if($CompletedTodo.classList.contains('selected')) {
    $CompletedTodo.classList.remove('selected');
  }

  const $TodoItems = document.querySelectorAll('li');

  $TodoItems.forEach((TodoItem) => {
    if(TodoItem.classList.contains('completed')) {
      TodoItem.classList.add('hidden');
    }
    else {
      TodoItem.classList.remove('hidden');
      $TodoCount.textContent = TodoItemList.length - $TodoList.querySelectorAll('.completed').length;
    }
  });
}

const CompletedTodoShow = () => { // 완료한 일
  $CompletedTodo.classList.add('selected');

  if($AllTodo.classList.contains('selected')) {
    $AllTodo.classList.remove('selected');
  }
  if($ActiveTodo.classList.contains('selected')) {
    $ActiveTodo.classList.remove('selected');
  }
  const $TodoItems = document.querySelectorAll('li');

  $TodoItems.forEach((TodoItem) => {
    if(TodoItem.classList.contains('completed')) {
      TodoItem.classList.remove('hidden');
      $TodoCount.textContent = $TodoList.querySelectorAll('.completed').length;
    }
    else {
      TodoItem.classList.add('hidden');
    }
  });
}

init();

const setLocalStorage = (TodoItemList) => {
  localStorage.setItem('TodoItemList', JSON.stringify(TodoItemList)); // 'TodoItemList'라는 키에 TodoItemList의 데이터들을 문자열로 변환하여 저장
}

const getLocalStorage = () => {
  const TodoItemStorage = localStorage.getItem('TodoItemList');

  if(TodoItemStorage === 'undefined' || TodoItemStorage === null) {
    TodoItemList = [];
  }
  else {
    TodoItemList = JSON.parse(TodoItemStorage); // TodoItemStorage에 데이터가 들어있을 경우 TodoItemList에 저장
    AddList(TodoItemList);
    $TodoCount.textContent = TodoItemList.length;
  }
}

getLocalStorage();