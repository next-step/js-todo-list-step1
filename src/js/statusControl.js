import {todoList, drawTodos, toggleStatus, handleDestroy, handleEdit} from './todoList.js';

document.querySelector('.filters').addEventListener('click', function(e){
  e.preventDefault();
  const liEls = document.querySelectorAll('.filters li a');
  
  for(var i = 0; i<liEls.length; i++) {
    liEls[i].classList.remove('selected');
  }
  const className = e.target.className;
  if(className === 'all'){
    drawTodos(todoList);
  }else if (className === 'active'){
    const filtered = todoList.filter(o => o.status === '')
    drawTodos(filtered);
  } else {

    const filtered = todoList.filter(o => o.status === 'completed')
    drawTodos(filtered);
  }
  e.target.classList.add('selected');

  toggleStatus();
  handleDestroy();
  handleEdit();
})

