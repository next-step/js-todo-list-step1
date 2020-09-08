import { TodoItem } from "./TodoItem.js"
import { TodoInput } from "./TodoInput.js"
import { TodoList } from "./TodoList.js"
import { TodoCount } from "./TodoCount.js"

function TodoApp() {
    this.todoItems = [];
    this.id = 0;

    this.setState = (updatedItems,viewMode) => {
        this.todoItems = updatedItems;
        todoList.setState(this.todoItems,viewMode);
      };

    new TodoInput({
        onAdd: contents => {
            const newTodoItem = new TodoItem(contents,this.id++);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    });
    
    const todoList = new TodoList({
        onRemove: contents => {
            this.todoItems.forEach((item,index)=>{
                if(item.id === contents) this.todoItems.splice(index,1);
            });
            this.setState(this.todoItems);
        },
        onChangeState: contents => {
            this.todoItems.forEach((item,index)=>{
                if(item.id === contents) {
                    item.toggleState();
                }
            });
            this.setState(this.todoItems);
        },
        onChangeTitle: (contents,title) => {
            this.todoItems.forEach((item,index) => {
                if(item.id == contents) {
                    item.title = title;
                }
            });
        }
    });
    new TodoCount({
        onChangeView: contents => {
            this.setState(this.todoItems,contents);
        }
    });
}  

new TodoApp();