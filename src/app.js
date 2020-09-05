const $inputTodoNewTitle = document.querySelector('#new-todo-title');
const $ulTodoList = document.querySelector('#todo-list');

const todoListAddTitle = ({key}) => {
  if (key === 'Enter' && $inputTodoNewTitle.value.length !== 0) {
    $ulTodoList.insertAdjacentHTML(
      'beforeend',
      renderNewToDoTemplate($inputTodoNewTitle.value)
    );
    $inputTodoNewTitle.value = '';
  }
};
const handleInputKey = ( target, key , temp ) => {
  if (key === 'Escape') {
    target.closest('li').classList.remove('editing');
  } else if (key === 'Enter') {
    target.closest('li').classList.remove('editing');
    target.parents('label').textContent = target.value;

  }
};




const todoListOnToggle = ({target}) => {
  if (target.className === 'toggle') {
    target.closest('li').classList.toggle('completed');
  } else if (target.className === 'destroy') {
    target.closest('li').remove();
  }
};

const todoListDoubleClickedOnToggle = ({target}) => {

  if (target.nodeName === 'LABEL') {
    const temp = target.closest('label').textContent;
    target.closest('li').classList.toggle('editing');
    const $inputEdit = target.closest('.editing').querySelector('.edit');
    $inputEdit.value = temp;
    $inputEdit.addEventListener('keyup', (e) => {
      handleInputKey(e.target , e.key, temp)
    });
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
