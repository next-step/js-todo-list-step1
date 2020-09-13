export function TodoInput({addItem}){
  const $todoInput = document.querySelector("#new-todo-title");

  this.addTodoItem = (target) => {
    const $newTodoTarget = target;
    if (!!$newTodoTarget.value.trim()) {
      addItem($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
  
  $todoInput.addEventListener("keydown", ({target, key}) => {
    if(key === "Enter") this.addTodoItem(target);
  });

}
