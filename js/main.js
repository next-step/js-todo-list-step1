import { TodoInput } from "./TodoInput.js"
import { TodoList } from "./TodoList.js"
import { TodoCount } from "./TodoCount.js"
import { ItemController } from "./ItemController.js"

function TodoApp() {
    this.state = {
        todoItems:[],
        id:0,
        viewMode:"all",
    }

    this.setState = (command,value) => {
        if(command === "addItem"){ //value = {item}
            this.state.id++; 
            todoList.render.add(value,this.state.viewMode);
        }
        else if(command === "changeView"){ //value = newViewMode
            if( this.state.viewMode == value) return;
            todoList.render.view(value);
            this.state.viewMode = value;
        }
    }
    
    const itemController = new ItemController(this.state.todoItems);
    const todoList = new TodoList(itemController,this.state);

    new TodoInput({
        addItem: (title) => {
            const item = {id:this.state.id,title:title};
            itemController.addItem(item);
            this.setState("addItem",item);
        }
    })
    
    new TodoCount({
        onChangeView: viewMode => {
            this.setState("changeView",viewMode);
        }
    });
}  

new TodoApp();
