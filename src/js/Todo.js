export default class Todo {
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
        if (this.checkNull(todo)) {
            return alert('빈 값을 입력할 수 없습니다.');
        };
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
        const todoApp = this;
        const editType = {
            Enter () {
                labelArea.innerText = target.value;
                target.closest('li').classList.remove('editing');
                todoApp._todoItems.filter(todo => todo.id == target.closest('li').id)
                                  .map(todo => todo.text = target.value);
                todoApp.saveLocalStorage();
            },

            Escape () {
                target.value = originalValue;
                target.closest('li').classList.remove('editing');
            }
        }
        if (!editType[key]) {
            return;
        }
        editType[key]();
    }

    printTodos(todoObj) {
        const checked = todoObj.checked == 'true' ? 'checked' : '';
        const completed = todoObj.class == 'completed' ? 'completed' : ''; 
        this._todoLi = document.createElement('li');
        this._todoLi.id = todoObj.id;
        this._todoLi.className = completed;
        this._todoLi.innerHTML = `
                <div class='view'>
                    <input class="toggle" type="checkbox" ${checked}>
                    <label class="label">${todoObj.text}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value=${todoObj.text}> 
        `;
        this._todoList.append(this._todoLi);
    }

    loadTodos() {
        this.initTodoList();
        const todoApp = this;
        this._todoItems = this.getLocalStorage();
        if (Object.keys(this._todoItems).length == 0) {
            this._id = 1;
            return;
        }
        this._id = parseInt(this._todoItems[this._todoItems.length - 1].id) + 1;
        this._todoItems.map((value, index) => todoApp.printTodos(value));
        this._todoCount.innerText = this.todoCount;
    }

    changeTodoState(li, toggleCheck) {
        if (li.className == '') {
            li.classList.add('completed');
            toggleCheck.setAttribute('checked', '');
            this.updateItems(li);
            return;
        } 
        li.removeAttribute('class');
        toggleCheck.removeAttribute('checked');
        this.updateItems(li);
    }
    
    updateItems(li) {
        this._todoItems.filter(todo => todo.id == parseInt(li.id))
                       .map(todo => {
            todo.class = li.className;
            todo.checked = li.classList.contains('completed')? 'true' : 'false';
        });
        this.saveLocalStorage();
    }

    deleteItems(li) {
        const filterdItems = this._todoItems.filter(function (todo) {
            return todo.id != parseInt(li.id);
        });
        this._todoItems = filterdItems;
        this.saveLocalStorage();
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
        parsedTodos.filter(todo => todo.class != 'completed')
                   .map(todo => todoApp.printTodos(todo));
        this._todoCount.innerText = this.todoCount;
    }

    completedList() {
        this.initTodoList();
        const todoApp = this;
        const parsedTodos = this.getLocalStorage();
        parsedTodos.filter(todo => todo.class == 'completed')
                   .map(todo => todoApp.printTodos(todo));
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

    checkNull(todo) {
        if (todo.trim() == '') {
            return true;
        }
        return false;
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
