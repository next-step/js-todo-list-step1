import { TodoList } from './TodoList.js';
import { TodoInput } from './TodoInput.js';
import { TodoTotalCount } from './TodoTotalCount.js'

export function TodoApp($div) {
    const $input = $div.querySelector("#new-todo-title");
    const $ul = $div.querySelector('#todo-list')

    this.todoItems = [];

    this.todoInput = new TodoInput(this);
    this.todoList = new TodoList($ul, this);
    this.todoTotalCount = new TodoTotalCount( $div, this );

    this.saveItem = (item) => {
      this.todoItems.push(item)
      this.todoList.setState(this.todoItems);
      this.todoTotalCount.setState(this.todoItems);
    }

    this.complete = (todoItem) => {
      this.todoItems.filter(item => item.todoItem === todoItem)
                    .forEach(item => item.completed = !item.completed)
      this.todoList.setState(this.todoItems);
    }

    this.delete = (todoItem) => {
      const index = this.todoItems.findIndex(item => item.todoItem === todoItem);
      this.todoItems.splice(index, 1);
      this.todoList.render(this.todoItems);
      this.todoTotalCount.setState(this.todoItems);
    }

    this.update = (id, todoItem) =>{
      const index = this.todoItems.findIndex(item => item.todoItem === id);
      this.todoItems[index].todoItem = todoItem;
      this.todoList.render(this.todoItems)
    }

    this.filterTodo = (completeState) =>{

      if(completeState === '전체보기') {
        this.todoList.render(this.todoItems);
        this.todoTotalCount.setState(this.todoItems);
      }

      if(completeState === '해야할 일'){
        const notCompletedItems =  this.todoItems.filter(item => !item.completed);
        this.todoList.render(notCompletedItems);
        this.todoTotalCount.setState(notCompletedItems);
      }
    
      if(completeState === '완료한 일'){
        const completedItems =  this.todoItems.filter(item => item.completed);
        this.todoList.render(completedItems);
        this.todoTotalCount.setState(completedItems);
      }
    

    }
    this.setState = updatedItems => {
      this.todoItems = updatedItems;
      TodoList.setState(this.todoItems);
    };



}
  

