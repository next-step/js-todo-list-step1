class Todo {
    constructor() {
        this._todoListKey = "todo";
        this._todoItems = [];
        this._id = 0;
        this._todoInput = document.getElementById('new-todo-title');
        this._todoList = document.getElementById('todo-list');
        this._todoFilter = document.querySelector('.filters');
        this._todoCount = document.querySelector('.todo-count').firstElementChild;
        this.loadTodos();
    }

    add(todo) {
        const todoObj = {
            text : todo,
            id : this._id,
            class : '',
            checked : 'false'
        }
        this._todoItems.push(todoObj);
        this.saveLocalStorage();
        this.loadTodos();
    }

    destroy(target, li) {
        target.removeChild(li);
        this._todoCount.innerText = this.todoCount;
        this.deleteItems(li);
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

    printTodos(todoObj) {
        this._isDone = false;
        this._todoLi = document.createElement('li');
        this._view = document.createElement('div');
        this._toggle = document.createElement('input');
        this._label = document.createElement('label');
        this._labelTest = document.createTextNode(todoObj.text);
        this._destroy = document.createElement('button');
        this._edit = document.createElement('input');
        this._view.className = 'view';
        this._toggle.className = 'toggle';
        this._label.className = 'label';
        this._destroy.className = 'destroy';
        this._edit.className = 'edit';
        this._toggle.setAttribute("type", "checkbox");
        if (todoObj.checked == 'true') {
            this._toggle.setAttribute('checked', '');
        }
        this._label.append(this._labelTest);
        this._edit.setAttribute("value", todoObj.text);
        this._view.append(this._toggle, this._label, this._destroy);
        this._todoLi.append(this._view, this._edit);
        this._todoLi.id = todoObj.id;
        this._todoLi.className = todoObj.class;
        this._todoList.append(this._todoLi);
    }

    loadTodos() {
        this.initTodoList();
        const that = this;
        this._todoItems = this.getLocalStorage();
        this._id = this._todoItems.length > 0 ? this._todoItems[this._todoItems.length - 1].id + 1 : 1;
        this._todoItems.forEach(function(todo) {
            that.printTodos(todo);
        });
        this._todoCount.innerText = this.todoCount;
    }

    changeTodoState(li, toggleCheck) {
        if (li.className == '') {
            li.classList.add('completed');
            toggleCheck.setAttribute('checked', '');
        } else {
            li.removeAttribute('class');
            toggleCheck.removeAttribute('checked');
        }
        this.updateItems(li);
    }
    
    updateItems(li) {
        this._todoItems.forEach(function(todo) {
            if (todo.id == parseInt(li.id)) {
                todo.class = li.className;
                todo.checked = li.classList.contains('completed')? 'true' : 'false';
            }
        })
        this.saveLocalStorage();
    }

    deleteItems(li) {
        const filterdItems = this._todoItems.filter(function (todo) {
            return todo.id != parseInt(li.id);
        });
        this._todoItems = filterdItems;
        this.saveLocalStorage();
    }

    renumberedItems(todoItems) {
        let newId = 1;
        todoItems.forEach(function(todo){
            todo.id = newId;
            newId++;
        });
    }

    initTodoList() {
         while (this._todoList.firstChild) {
             this._todoList.removeChild(this._todoList.firstChild);
         }
    }

    allList() {
        this.loadTodos();
    }

    activeList() {
        this.initTodoList();
        const todoApp = this;
        const parsedTodos = this.getLocalStorage();
        parsedTodos.forEach(function(todo) {
            if (todo.class != 'completed') {
                todoApp.printTodos(todo);
            }
        });  
        this._todoCount.innerText = this.todoCount;
    }

    completedList() {
        this.initTodoList();
        const todoApp = this;
        const parsedTodos = this.getLocalStorage();
        parsedTodos.forEach(function(todo) {
            if (todo.class == 'completed') {
                todoApp.printTodos(todo);
            }
        });  
        this._todoCount.innerText = this.todoCount;
    }
    
    getLocalStorage() {
        const loadedTodos = localStorage.getItem(this._todoListKey);
        if (!loadedTodos) return [];
        const paredTodos = JSON.parse(loadedTodos);
        return paredTodos;
    }

    saveLocalStorage() {
        localStorage.setItem(this._todoListKey, JSON.stringify(this._todoItems))
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
