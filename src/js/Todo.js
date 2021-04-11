class Todo {
    constructor() {
        this._todoItems = [];
        this._todoInput = document.getElementById('new-todo-title');
        this._todoList = document.getElementById('todo-list');
        this._todoFilter = document.querySelector('.filters');
        this._todoCount = document.querySelector('.todo-count').firstElementChild;
    }

    add(todo) {
        this._isDone = false;
        this._todoLi = document.createElement('li');
        this._view = document.createElement('div');
        this._toggle = document.createElement('input');
        this._label = document.createElement('label');
        this._labelTest = document.createTextNode(todo);
        this._destroy = document.createElement('button');
        this._edit = document.createElement('input');
        this._view.className = 'view';
        this._toggle.className = 'toggle';
        this._label.className = 'label';
        this._destroy.className = 'destroy';
        this._edit.className = 'edit';
        this._toggle.setAttribute("type", "checkbox");
        this._label.append(this._labelTest);
        this._edit.setAttribute("value", todo);
        this._view.append(this._toggle, this._label, this._destroy);

        this._todoLi.append(this._view, this._edit);
        this._todoList.append(this._todoLi);
        this._todoCount.innerText = this.todoCount;
        this._todoItems.push(this._todoLi);
    }

    destroy(target, li) {
        target.removeChild(li);
        this._todoCount.innerText = this.todoCount;
        this.updateItems();
    }

    edit({target, key},labelArea, originalValue) {
        switch(key) {
            case 'Enter' :
                labelArea.innerText = target.value;
                target.closest('li').removeAttribute('class');
                return;
            case 'Escape' :
                target.value = originalValue;
                target.closest('li').removeAttribute('class');
                return;
        }
    }

    changeTodoState(li, toggleCheck) {
        if (li.className == '') {
            li.classList.add('completed');
            toggleCheck.setAttribute('checked', '');
        } else {
            li.removeAttribute('class');
            toggleCheck.removeAttribute('checked');
        }
        this.updateItems();
    }
    
    updateItems() {
        this._todoItems = [];
        this._todoList.childNodes.forEach(element => {
            this._todoItems.push(element);
        });
    }

    initTodoList() {
        while (this._todoList.firstChild) {
            this._todoList.removeChild(this._todoList.firstChild);
        }
    }

    allList() {
        this.initTodoList();
        this._todoItems.forEach(element=> {
            this._todoList.append(element);
        });
    }

    activeList() {
        this.initTodoList();
        this._todoItems.forEach(element=> {
            if (element.className != 'completed') {
                this._todoList.append(element);
            }
        });
    }

    completedList() {
        this.initTodoList();
        this._todoItems.forEach(element=> {
            if (element.className == 'completed') {
                this._todoList.append(element);
            }
        });
    }

    get todoCount() {
        return this._todoList.childNodes.length;
    }

    get todoInput() {
        return this._todoInput;
    }

    get todoList() {
        return this._todoList;
    }

    get todoFilter() {
        return this._todoFilter;
    }
}
const todoApp = new Todo();

todoApp.todoInput.addEventListener('keydown', function() {
    if (window.event.keyCode == 13) {
        todoApp.add(this.value);
        this.value = '';
    }
});

todoApp.todoList.addEventListener('click', function(event) {
    const toggleCheck = event.target.closest('.toggle');
    const destroyButton = event.target.closest('.destroy');
    const li = event.target.closest('li');
    if (toggleCheck) {
        todoApp.changeTodoState(li, toggleCheck);
    }
    if (destroyButton) {
        todoApp.destroy(this, li);
    }
});

todoApp.todoList.addEventListener('dblclick', function(event) {
    const labelArea = event.target.closest('.label');
    const li = event.target.closest('li');
    if (!labelArea) return;

    const originalValue = labelArea.innerText;
    li.classList.add('editing');
    li.addEventListener('keyup', ({target, key}) => todoApp.edit({target, key},labelArea, originalValue))
});

todoApp.todoFilter.addEventListener('click', function(event) {
    switch(event.target.id) {
        case 'all' :
            todoApp.allList();
            initClassList(event, this);
            return;
        case 'active' :
            todoApp.activeList();
            initClassList(event, this);
            return;
        case 'completed' :
            todoApp.completedList();
            initClassList(event, this);
            return;
    }
})

const initClassList = (event, target) => {
    for (let item of target.children) {
        item.children[0].classList.remove('selected');
    }
    event.target.classList.add('selected');
}
