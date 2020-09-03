const inputNewTodo = document.getElementById('new-todo-title');
const ulCreated = document.getElementById('todo-list');


const handleInput = (e) => {

  if (e.key === 'Enter' && inputNewTodo.value.length !== 0) {
    let newLi = document.createElement('li');
    let newLiInDiv = document.createElement('div');
    let newTodoText = document.createTextNode(inputNewTodo.value);

    let newInputCheckBox = document.createElement('input');
    newInputCheckBox.type = 'checkBox';
    newInputCheckBox.classList.add('tttt');

    newLiInDiv.appendChild(newTodoText);
    newLi.appendChild(newInputCheckBox);
    newLi.appendChild(newLiInDiv);
    ulCreated.appendChild(newLi);
    inputNewTodo.value = '';
  }
};

inputNewTodo.addEventListener('keypress', handleInput);
