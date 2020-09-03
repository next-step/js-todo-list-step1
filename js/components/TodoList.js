import todoItem from "./TodoItem.js";

class TodoList{

    constructor() {
        this.$todoList = document.getElementById('todo-list');
        this.$todoList.addEventListener('click', this.onClick);
        this.$todoList.addEventListener('dblclick', this.onDblClick);
        this.$todoList.addEventListener('keyup', this.onKeyup);
    }

    setState = updateItems => {
        this.render(updateItems);
    };

    render = items=>{
        for (const item of items) {
            this.$todoList.append(item);
        }
    }

    onClick({target}) {
        if(!target)return ;
        let cls = target.classList;
        if (cls.contains("toggle")) {
            target.parentElement.parentElement.classList.toggle('completed');
        } else if(cls.contains("destroy")) {
            target.parentElement.parentElement.remove();
        }
    };

    onDblClick({target}) {
        if(!target)return ;
        if(target.tagName === "LABEL")
        target.parentElement.parentElement.classList.add("editing");
    };

    onKeyup({ target, key }) {
        if(target && target.tagName ==="INPUT") {
            switch (key) {
                case "Escape": {
                    target.value = target.previousElementSibling.querySelector('.label').textContent;
                    target.parentElement.classList.remove('editing');
                    break;
                }
                case "Enter":{
                    target.previousElementSibling.querySelector('.label').textContent = target.value;
                    target.parentElement.classList.remove('editing');
                    break;
                }
            }
        }

    }
}

export default TodoList;
