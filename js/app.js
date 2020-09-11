function TodoApp(){
    this.todoItems = [];

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        todoList.setState(this.todoItems);
        console.log(this.todoItems);
    }

    const todoList = new TodoList({
        onToggle: (id, type) => {
            const idx = this.todoItems.findIndex(item => item.id === parseInt(id));
            this.todoItems[idx].type = type;
            this.setState(this.todoItems);
        },
        onRemove: (id) => {

        },
        onMod: () => {

        }
    });

    const todoInput = new TodoInput({
        onAdd: title => {
            const nextId = this.todoItems.length > 0 ? this.todoItems[this.todoItems.length - 1].id + 1 : 1;
            const newTodoItem = new TodoItem(title, nextId);
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    });
}

function TodoItem(title, nextId){
    return {
        id: nextId,
        title: title,
        type: "view"
    }
}

function TodoInput({onAdd}){
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener("keydown", event => {
        this.addTodoItem(event);
    });

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if(this.isValid(event, $newTodoTarget.value)){
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };

    this.isValid = (event, value) => {
        if(event.key === "Enter" && value !== ""){
            return true;
        }
    };
}

function TodoList({onToggle, onRemove, onMod}) {
    const $todoList = document.querySelector("#todo-list");

    $todoList.addEventListener("click", event => {
        let target = event.target;

        if(target.classList.contains("toggle")){
            onToggleTodoItem(target);
        }else if(target.classList.contains("destroy")){
            onRemoveTodoItem(target);
        }
    });

    $todoList.addEventListener("dblclick", event => {

    });

    const onToggleTodoItem = target => {
        const $li = target.closest("li");
        let type = (target.checked === true ? "completed" : "view");

        onToggle($li.dataset.id, type);
    };

    const onRemoveTodoItem = target => {
        const $li = target.closest("li");
        const id = $li.dataset.id;

        onRemove(id);
    };

    this.todoItemTemplate = item => {
        return `<li data-id="${item.id}" class="${item.type === "view" ? "" : item.type}">
            <div class="view">
                <input class="toggle" type="checkbox" ${item.type === "completed" ? "checked" : ""}>
                    <label class="label">${item.title}</label>
                    <button class="destroy"></button>
            </div>
            <input class="edit" value="새로운 타이틀">
        </li>`;
    }

    this.setState = updatedTodoItems => {
        this.todoItems = updatedTodoItems;
        this.render(this.todoItems);
    }

    this.render = items => {
        const template = items.map(item => this.todoItemTemplate(item));
        $todoList.innerHTML = template.join("");
    }
}

function TodoCount(){

}

TodoApp();