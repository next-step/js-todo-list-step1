const insertTodoInputEl = document.querySelector('#new-todo-title');
export const todoList = JSON.parse(localStorage.getItem('todoList')) ||[];

function setLocalStorage(todoList){
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function addTodos(e){
  if(e.target.value === '') return;
  todoList.push({id: todoList.length,status: '', label: e.target.value});
  setLocalStorage(todoList);
  document.querySelector('.todo-count > strong').textContent = todoList.length;
  drawTodos(todoList);
}

export function drawTodos(todoList) {
  if(todoList.length === 0) return;
  document.querySelector('#todo-list').innerHTML = todoList.map((todo, i) => `
  <li class=${todo.status}>
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.id} data-index=${i} ${todo.status === 'completed' && 'checked'} />
      <label class="label" data-index=${i}>${todo.label}</label>
      <button class="destroy" data-id=${todo.id}></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`).join('');
  insertTodoInputEl.value = '';
}
    
function toggleStatus(){
  const toggleEls = document.querySelectorAll('.toggle')

  for(var i = 0; i<toggleEls.length; i++) {
    toggleEls[i].addEventListener('click', function(e){
      e.target.setAttribute('checked',  e.target.checked);
      if(e.target.checked) {
        e.target.parentNode.parentNode.className = 'completed';
        todoList[e.target.dataset.index].status = 'completed';

      }else {
        e.target.parentNode.parentNode.className = '';
        todoList[e.target.dataset.index].status = '';
      }
      console.log({todoList})
      setLocalStorage(todoList);
    });
  }

}

function handleDestroy(){
  const destroyEls = document.querySelectorAll('.destroy');

  for(var i = 0; i<destroyEls.length; i++) {
    destroyEls[i].addEventListener('click', function(e){
      const index = [...e.target.parentElement.parentElement.parentElement.children].indexOf(e.target.parentElement.parentElement);
      todoList.splice(index, 1);
      setLocalStorage(todoList);

      e.target.parentNode.parentNode.remove();
      if(e.target.checked) {
        e.target.parentNode.parentNode.className = 'completed';
      }else {
        e.target.parentNode.parentNode.className = 'view';
      }
    });
  }
}

function handleEdit(){
  const labelEls = document.querySelectorAll('label')

  for(var i = 0; i<labelEls.length; i++) {
    labelEls[i].addEventListener('dblclick', function(e){
      let liTarget = e.target.parentElement.parentElement;
      if(liTarget.className === '' || liTarget.className === 'completed'){
        liTarget.className = 'editing';
        liTarget.querySelector('.edit').value = e.target.textContent;
        liTarget.querySelector('.edit').focus();
        const index = e.target.dataset.index
        liTarget.querySelector('.edit').addEventListener('keydown', function(e){
          if(e.key === 'Enter'){
            todoList[index].label = e.target.value;
            liTarget.className = todoList[index].status;
            liTarget.querySelector('label').textContent =e.target.value
          }
          if(e.key === 'Escape' ){
          liTarget.className = '';
          }
        })
      }
      
    });

  }

}

insertTodoInputEl.addEventListener('keypress', function(e){
  if(e.key === 'Enter' ){
    addTodos(e);
  }
    toggleStatus();
    handleDestroy();
    handleEdit();
});

window.addEventListener('load', function(e){
  const todoList = JSON.parse(localStorage.getItem('todoList'))
  drawTodos(todoList)

  toggleStatus();
  handleDestroy();
  handleEdit();
})


export {toggleStatus, handleDestroy, handleEdit};