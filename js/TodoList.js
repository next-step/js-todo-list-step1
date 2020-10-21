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
        let type = (target.checked === true ? "completed" : "active");

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
        return `<li data-id="${item.id}" class="${item.type === "active" ? "" : item.type}">
            <div class="view">
                <input class="toggle" type="checkbox" ${item.type === "completed" ? "checked" : ""}>
                    <label class="label">${item.title}</label>
                    <button class="destroy"></button>
            </div>
            <input class="edit" value="">
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
};

export default TodoList;