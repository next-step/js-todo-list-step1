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
const todoListDoubleClickedOnToggle = (event) => {
  const handleKey = ({ target, key }) => {
    if (key === 'Escape') {
      //
    } else if (key === 'Enter') {
      //
    }
  };

  if (event.target.nodeName === 'LABEL') {
    const temp = event.target.closest('label').textContent;
    event.target.closest('li').classList.toggle('editing');
    const $inputEdit = event.target.closest('.editing').querySelector('.edit');
    $inputEdit.value = temp;

    $inputEdit.addEventListener('keyup', handleKey);
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

$inputTodoNewTitle.addEventListener('keyup', todoListAddTitle);
$ulTodoList.addEventListener('click', todoListOnToggle);
$ulTodoList.addEventListener('dblclick', todoListDoubleClickedOnToggle);
