class ToDo{
    constructor(repository = new ToDoRepository()){
        this.items = [];
        this.repository = repository;
        this.init();
    }

    init(){
        this.loadItems();
    }

    loadItems(){
        this.items = this.repository.load();
    }

    addItem(todoText){
        const id = this.items.length +1;
        const newItem = new ToDoItem(id,todoText);
        this.items.push(newItem);
        this.saveItems();
        return newItem;
    }

    deleteItem(deletedId){
        const deletedIndex= this.items.findIndex( (item) =>{
            return item.id == deletedId;
        });
        this.items.splice(deletedIndex,1);
        this.saveItems();
    }
    saveItems(){
        this.repository.save(this.items);
    }
    isCompleted(completedId,isCompleted){
        this.items.find( (item) =>{
            item.id == completedId ? item.isCompleted = isCompleted : false;
        });
        this.saveItems();
    }
    filterItem(filterName){
        let filterList = this.items.filter(todo => {
            return filterName == 'active' ? todo.isCompleted == false : todo.isCompleted == true;
        })
        return filterList;
    }
    updateItem(updateId,updateText){
        this.items.find( (item) =>{
            if(item.id == updateId) item.text = updateText;
        });
        this.saveItems();
    }
}