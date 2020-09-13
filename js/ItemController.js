import { TodoItem } from "./TodoItem.js"
import TodoState from "./TodoState.js"
export default new class ItemController{
    constructor(){
        this.todoItems = TodoState.items;    
    }

    getItems = (filter) => {
        return this._filters(function(item){
            if(filter === undefined) return true;
            return item.completed == filter;
        });
    }

    getItemsByState = (state) => {
        if(state === undefined || state === "all") {
            return this.todoItems;
        }
        state = state === "active" ? false : true;
        return this._filters( item => item.completed == state);
    }

    getItemById = (id) => {
        //return todoItems.find(item => item.id == id);
        return this._filter( item => item.id == id);
    }

    addItem = (item) => {
        const newItem = new TodoItem(TodoState.id++,item.title,!!item.completed)
        this.todoItems.push(newItem);
        return newItem;
    }

    deleteItem = (id) => {
        this._filter(item=>{
            if(item.id === id) this.todoItems.splice(this.todoItems.indexOf(item),1);
        });
        return id;
    }

    toggleItem = (id,target) => {
        this._filter(item=>{
            if(id == item.id) item[target] = !item[target]; 
        })
    }

    changeTitle = (id,title) => {
        this._filter(function(item){
            if(id == item.id) item.title=title;
        });
    }

    clear = () => {
        this.todoItems.splice(0,this.todoItems.length);
        TodoState.id = 0;
    }
    _filter = (predi) => {
        let newItem;
        this.todoItems.forEach(item => {
            if(predi(item)) newItem = item;
        });
        return newItem;
    }

    _filters = (predi) => {
        const newItems = [];
        this.todoItems.forEach(item=>{
            if(predi(item)) newItems.push(item);
        });
        return newItems;
    }
}
