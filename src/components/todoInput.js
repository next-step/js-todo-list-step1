export const todoInput = () => {
  const $newTodoTitle = document.getElementById("new-todo-title");
 
  console.log($newTodoTitle);
  $newTodoTitle.addEventListener("keyup", addTodoItem);
 }

const addTodoItem = ({target, key}) => {
    if(target.value && key === "Enter"){
        const $todoList = document.getElementById("todo-list");
        $todoList.insertAdjacentHTML("beforeend" ,newTodoItem(target.value));
        target.value = '';
    }
    
}

const newTodoItem = (title) => {
    return `<li>
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${title}" />
  </li>`
}
