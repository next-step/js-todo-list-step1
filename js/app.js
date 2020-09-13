function TodoApp(){
    this.todoItems = [];

    this.setState = updatedItems => {
        this.todoItems = updatedItems;
        todoList.setState(this.todoItems);
        console.log(this.todoItems);
    }

    const getIdx = id => {
        return this.todoItems.findIndex(item => item.id === parseInt(id));
    };

    const todoList = new TodoList({
        onToggle: (id, type) => {
            let newTodoItems = [...this.todoItems];
            newTodoItems[getIdx(id)].type = type;
            this.setState(newTodoItems);
        },
        onRemove: (id) => {
            let newTodoItems = [...this.todoItems];
            newTodoItems.splice(getIdx(id), 1);
            this.setState(newTodoItems);
        },
        onMod: (id, title) => {
            let newTodoItems = [...this.todoItems];
            newTodoItems[getIdx(id)].title = title;
            this.setState(newTodoItems);
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
        if(isValid(event, $newTodoTarget.value)){
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };

    const isValid = (event, value) => {
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
        onChangeToEditing(event.target);
    });

    $todoList.addEventListener("keydown", event => {
        if(event.key === "Escape"){
            onChangeToView(event.target);
        }else if(event.key === "Enter"){
            onModTodoItem(event.target);
        }
    })

    const onToggleTodoItem = target => {
        const $li = target.closest("li");
        let type = (target.checked === true ? "completed" : "view");

        onToggle($li.dataset.id, type);
    };

    const onChangeToEditing = target => {
        const $li = target.closest("li");
        const $editInput = $li.querySelector(".edit");
        const title = target.innerText;

        $editInput.value = title;
        $li.classList.add("editing");
        $editInput.focus();
    };

    const onChangeToView = target => {
        const $li = target.closest("li");
        $li.classList.remove("editing");
    };

    const onModTodoItem = target => {
        const $li = target.closest("li");
        const $editInput = $li.querySelector(".edit");

        onMod($li.dataset.id, $editInput.value);
    };

    const onRemoveTodoItem = target => {
        const $li = target.closest("li");
        const id = $li.dataset.id;

        onRemove(id);
    };

    const todoItemTemplate = item => {
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
        const template = items.map(item => todoItemTemplate(item));
        $todoList.innerHTML = template.join("");
    }
}

function TodoCount(){
    const $countContainer = document.querySelector(".count-container");
    const $todoCount = $countContainer.querySelector(".todo-count");
    const $count = $todoCount.querySelector("strong");

    this.render = count => {
        $count.innerText = count;
    }
}

TodoApp();