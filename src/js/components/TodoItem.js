export default class TodoItem {
    constructor({todoList, completed, text}){
        this.todoList = todoList;
        this.title = document.createTextNode(text);
        this.item = document.createElement('li');
        this.view = document.createElement('div');
        this.view.className = 'view';

        this.completedCheck = document.createElement('input');
        this.completedCheck.type = 'checkbox';
        this.completedCheck.className = 'toggle';

        this.titleLabel = document.createElement('label');
        this.titleLabel.className = "label";

        this.deleteButton = document.createElement('button');
        this.deleteButton.className = 'destroy';

        this.editInput = document.createElement('input');
        this.editInput.className = 'edit';
        this.editInput.value = text;

        this.titleLabel.appendChild(this.title);
        this.view.appendChild(this.completedCheck);
        this.view.appendChild(this.titleLabel);
        this.view.appendChild(this.deleteButton);
        this.item.appendChild(this.view);
        this.item.appendChild(this.editInput);
        this.todoList.appendChild(this.item);
    }

    render() {

    }
}