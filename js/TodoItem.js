export function TodoItem(id,title,completed = false,editing = false){
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.editing = editing;
}