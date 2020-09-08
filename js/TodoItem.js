export function TodoItem(title,id,completed = false){
    this.id = id;
    this.title = title;
    this.completed = completed;
}
TodoItem.prototype.toggleState = function(){
    this.completed = !this.completed;
}
