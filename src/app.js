const $inputTodoNewTitle = document.querySelector('#new-todo-title');
const $ulTodoList = document.querySelector('#todo-list');

const todoListAddTitle = (event) => {
  if (event.key === 'Enter' && $inputTodoNewTitle.value.length !== 0) {
    $ulTodoList.insertAdjacentHTML(
      'beforeend',
      renderNewToDoTemplate($inputTodoNewTitle.value)
    );
    $inputTodoNewTitle.value = '';
  }
};

const todoListOnToggle = (event) => {
  if (event.target.nodeName === 'INPUT') {
    event.target.closest('li').classList.toggle('completed');
  } else if (event.target.nodeName === 'BUTTON') {
    event.target.closest('li').remove();
  }
};

const renderNewToDoTemplate = (title) => {
  return ` <li>
                    <div class="view">
                        <input class="toggle" type="checkbox">
                        <label class="label">${title}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="새로운 타이틀">
                </li>`;
};

$inputTodoNewTitle.addEventListener('keypress', todoListAddTitle);
$ulTodoList.addEventListener('click', todoListOnToggle);
