const inputNewTodo = document.getElementById('new-todo-title');
const ulCreated = document.getElementById('todo-list');

const handleDeletedClick = (param) => {
  if (!param) return;
  param.remove();
};

let indexOfId = 1;
const handleInput = (e) => {
  if (e.key === 'Enter' && inputNewTodo.value.length !== 0) {
    let newLi = document.createElement('li');
    newLi.setAttribute('id', `newTodoLi ${indexOfId++}`);
    let newLiInDiv = document.createElement('div');
    let newTodoText = document.createTextNode(inputNewTodo.value);

    let newInputCheckBox = document.createElement('input');
    newInputCheckBox.type = 'checkBox';
    newInputCheckBox.classList.add('tttt');

    // const handleComplete = () => {
    //   if (this.checked) {
    //     newLi.classList.add('completed');
    //   }
    // };

    // newInputCheckBox.addEventListener('change', handleComplete);

    const newDeleteBox = document.createElement('button');
    newDeleteBox.addEventListener('click', () => {
      handleDeletedClick(newDeleteBox.parentNode);
    });
    newDeleteBox.appendChild(document.createTextNode('X'));

    newLiInDiv.appendChild(newTodoText);
    newLi.appendChild(newInputCheckBox);
    newLi.appendChild(newLiInDiv);
    newLi.appendChild(newDeleteBox);
    ulCreated.appendChild(newLi);
    inputNewTodo.value = '';
  }
};

inputNewTodo.addEventListener('keypress', handleInput);
