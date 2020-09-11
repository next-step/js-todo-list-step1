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
            todoList._render.add(value,this.state.viewMode);
        }
        else if(command === "deleteItem"){ //value = id
            todoList._render.delete(value);
        }
        else if(command === "changeView"){ //value = newViewMode
            if( this.state.viewMode == value) return;
            todoList._render.changeView(value);
            this.state.viewMode = value;
        }
        else if(command === "changeTitle"){//value = [id,title]
            todoList._render.update(value[0],"title",value[1]);
        }
        else if(command === "changeState"){//value = [id,"completed, editing",viewMode]
            value[2] = this.state.viewMode;
            todoList._render.update(value[0],"state",value[1],this.state.viewMode);
        }
        else {
            console.log("없는 명령어 : ",command,value);
        }
    }
    
    const itemController = new ItemController(this.state.todoItems);

    new TodoInput({
        addItem: (title) => {
            const item = {id:this.state.id,title:title};
            itemController.addItem(item);
            this.setState("addItem",item);
        }
    })
    
    const todoList = new TodoList(itemController,{
        onRemove: id => {
            const deleteId = itemController.deleteItem(id);
            this.setState("deleteItem",id);
        },
        onChangeState: (id,target) => {
            itemController.toggleItem(id,target);
            this.setState("changeState",[id,target])
        },
        onChangeTitle: (id,newTitle) => {
            itemController.changeTitle(id,newTitle);
            this.setState("changeTitle",[id,newTitle]);
        }
    });

    new TodoCount({
        onChangeView: viewMode => {
            this.setState("changeView",viewMode);
        }
    });
}  

new TodoApp();
