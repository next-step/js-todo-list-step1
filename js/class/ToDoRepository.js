class ToDoRepository {
    constructor(name =  "toDos"){
        this.TODOS = name;
    }
    save(items){
        localStorage.setItem(this.TODOS, JSON.stringify(items));
    }
    load(){
        const toDosJson = localStorage.getItem(this.TODOS);
        const parsedToDos = JSON.parse(toDosJson) || [];
        const toDoItemList= parsedToDos.map(ToDoItem.getTodoItem) ;
        return toDoItemList;
    }
    
}
