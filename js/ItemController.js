import { TodoItem } from "./TodoItem.js"
export function ItemController(todoItems){
    // const Items = todoItems;

    this.getItems = (filter) => {
        return this._filters(function(item){
            if(filter === undefined) return true;
            return item.completed == filter;
        });
    }

    this.getItemsByState = (state) => {
        if(state === undefined || state === "all") {
            return todoItems;
        }
        state = state === "active" ? false : true;
        return this._filters( item => item.completed == state);
    }

    this.getItemById = (id) => {
        //return todoItems.find(item => item.id == id);
        return this._filter( item => item.id == id);
    }

    this.addItem = (item) => {
        const newItem = new TodoItem(item.id,item.title,!!item.completed)
        todoItems.push(newItem);
        return newItem;
    }

    this.deleteItem = (id) => {
        this._filter(item=>{
            if(item.id === id) todoItems.splice(todoItems.indexOf(item),1);
        });
        return id;
    }

    this.toggleItem = (id,target) => {
        this._filter(item=>{
            if(id == item.id) item[target] = !item[target]; 
        })
    }

    this.changeTitle = (id,title) => {
        this._filter(function(item){
            if(id == item.id) item.title=title;
        });
    }

    this._filter = (predi) => {
        let newItem;
        todoItems.forEach(item => {
            if(predi(item)) newItem = item;
        });
        return newItem;
    }

    this._filters = (predi) => {
        const newItems = [];
        todoItems.forEach(item=>{
            if(predi(item)) newItems.push(item);
        });
        return newItems;
    }
}
