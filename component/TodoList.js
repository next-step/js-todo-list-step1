export function TodoList($ul, context ) {
    this.todoItmes = [];

    this.setState = updatedTodoItems => {
      this.todoItems = updatedTodoItems;
      this.render(this.todoItems);
    };

    this.complete = (todoItem) => {
      context.complete(todoItem);
    },
    
    this.delete = (todoItem) => {
      context.delete(todoItem);
    },
    
    this.update = (id, todoItem) => {
      context.update(id, todoItem);
    },
  
    $ul.addEventListener('click', event => {
       if(event.target.className === 'toggle'){
         this.complete(event.target.closest('li').id);
       }
       if(event.target.className === 'destroy'){
         this.delete(event.target.closest('li').id);
      }
    })

    $ul.addEventListener('dblclick', event => {
        event.target.closest('li').classList.add('editing');
    })

    $ul.addEventListener('keydown', event => {
      const updatedTodoItem = event.target.value;
      const id = event.target.closest('li').id;
      if (event.keyCode === 13) {;
        this.update(id, updatedTodoItem);
        event.target.closest('li').classList.remove('editing');
      } else if (event.keyCode === 27) {
        event.target.closest('li').classList.remove('editing');
      }
      
    })    

    this.render = items => {
      $ul.innerHTML = items.map((item) => renderHTML(item))
                           .join("");
    };
  }

  const renderHTML = (todoItem) => {
   return `<li id=${todoItem.todoItem} class=${todoItem.completed ? "completed" : ""}>
    <div class="view">
      <input class="toggle" type="checkbox" ${todoItem.completed ? "checked" : ""}>
      <label class="label">${todoItem.todoItem}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit">
  </li>`
}