export class App {

    todoList = [];
    todoFilter = "all";
    todoComplete = [];

    constructor({ }) {
        this.$newTodo = document.querySelector('#new-todo-title');
        this.$todoList = document.querySelector('#todo-list');
        this.$todoCount = document.querySelector('span.todo-count strong');
        this.$seeAllButton = document.querySelector('a.all');
        this.$seeActiveButton = document.querySelector('a.active');
        this.$seeCompletedButton = document.querySelector('a.completed');

        this.$newTodo.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                this.addTodo(this.$newTodo.value);
            }
        })

        this.$todoList.addEventListener('click', event => {
            this.$todoList.querySelectorAll('.toggle').forEach(($item, index) => {
                if ($item.contains(event.target)) {
                    this.toggleCheckbox($item, index);
                }
            })
            this.$todoList.querySelectorAll('.destroy').forEach(($item, index) => {
                if ($item.contains(event.target)) {
                    this.deleteTodo($item, index);
                }
            })
        })

        this.$todoList.addEventListener('dblclick', event => {
            this.$todoList.querySelectorAll('li').forEach($item => {
                if ($item.contains(event.target)) {
                    this.convertToEditMode($item);
                }
            })
        })

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.$todoList.querySelectorAll('li').forEach($item => {
                    this.cancelEditMode($item);
                })
            }
        })

        this.$seeAllButton.addEventListener('click', () => {
            this.todoFilter = 'all';
            this.$seeAllButton.classList.add('selected');
            if (this.$seeActiveButton.classList.contains('selected')) {
                this.$seeActiveButton.classList.remove('selected');
            }
            if (this.$seeCompletedButton.classList.contains('selected')) {
                this.$seeCompletedButton.classList.remove('selected');
            }
            this.render();
        });
        this.$seeActiveButton.addEventListener('click', () => {
            this.todoFilter = 'active';
            this.$seeActiveButton.classList.add('selected');
            if (this.$seeAllButton.classList.contains('selected')) {
                this.$seeAllButton.classList.remove('selected');
            }
            if (this.$seeCompletedButton.classList.contains('selected')) {
                this.$seeCompletedButton.classList.remove('selected');
            }
            this.render();
        });
        this.$seeCompletedButton.addEventListener('click', () => {
            this.todoFilter = 'completed';
            this.$seeCompletedButton.classList.add('selected');
            if (this.$seeAllButton.classList.contains('selected')) {
                this.$seeAllButton.classList.remove('selected');
            }
            if (this.$seeActiveButton.classList.contains('selected')) {
                this.$seeActiveButton.classList.remove('selected');
            }
            this.render();
        });

        let localStorageItem = localStorage.getItem('todoList');
        if (localStorageItem === '') {
            this.todoList = [];
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
        }
        else {
            this.todoList = JSON.parse(localStorageItem);
        }

        localStorageItem = localStorage.getItem('todoComplete');
        if (localStorageItem === null) {
            this.todoComplete = [];
            localStorage.setItem('todoComplete', JSON.stringify(this.todoComplete));
        }
        else {
            this.todoComplete = JSON.parse(localStorageItem);
        }

        this.render();

    }

    addTodo = todo => {
        this.todoList.push(todo);
        this.todoComplete.push(false);

        this.renderTodo(todo);
        this.$newTodo.value = '';

        this.updateTodoCount(parseInt(this.$todoCount.innerText, 10) + 1);
        this.updateLocalStorage();
    }
    deleteTodo = ($destroyButton, index) => {
        this.todoList.splice(index, 1);
        this.todoComplete.splice(index, 1);

        const $todoItem = $destroyButton.parentNode.parentNode;
        this.$todoList.removeChild($todoItem);

        this.updateTodoCount(parseInt(this.$todoCount.innerText, 10) - 1);
        this.updateLocalStorage();
    }
    updateTodoCount = (newCount = 0) => {
        this.$todoCount.innerText = newCount;
    }
    toggleCheckbox = ($checkbox, index) => {
        const $todoItem = $checkbox.parentNode.parentNode;
        const checked = $checkbox.getAttribute('checked');
        const todo = $todoItem.querySelector('.label').value;

        if (!checked) {
            $todoItem.classList.add('completed');
            $checkbox.setAttribute('checked', true);
            this.todoComplete[index] = true;
        }
        else {
            $todoItem.classList.remove('completed');
            $checkbox.setAttribute('checked', false);
            this.todoComplete[index] = false;
        }
        this.updateLocalStorage();
    }
    updateLocalStorage = () => {
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
        localStorage.setItem('todoComplete', JSON.stringify(this.todoComplete));
        this.todoList = JSON.parse(localStorage.getItem('todoList'));
        this.todoComplete = JSON.parse(localStorage.getItem('todoComplete'));
    }

    renderTodo = todo => {
        const $todoItem = document.createElement('li');
        $todoItem.innerHTML = `
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${todo}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo}" />
            `;

        this.$todoList.appendChild($todoItem);
        return $todoItem;
    }

    render = () => {
        console.log('render');
        this.$todoList.innerHTML = ``;

        if (this.todoFilter === 'all') {
            this.todoList.forEach(($item, index) => {
                const $todoItem = this.renderTodo($item);
                if (this.todoComplete[index]) {
                    $todoItem.classList.add('completed');
                    $todoItem.querySelector('input.toggle').setAttribute('checked', true);
                }
            })
        }
        else if (this.todoFilter === 'active') {
            this.todoList.forEach(($item, index) => {
                if (!this.todoComplete[index]) {
                    this.renderTodo($item);
                }
            })
        }
        else if (this.todoFilter === 'completed') {
            this.todoList.forEach(($item, index) => {
                if (this.todoComplete[index]) {
                    const $todoItem = this.renderTodo($item);
                    $todoItem.classList.add('completed');
                    $todoItem.querySelector('input.toggle').setAttribute('checked', true);
                }
            })
        }
        this.updateTodoCount(this.todoList.length);
    }

    convertToEditMode = $todoItem => {
        const editing = $todoItem.classList.contains('editing');

        if (!editing) {
            $todoItem.classList.add('editing');
        }
    }
    cancelEditMode = $todoItem => {
        const editing = $todoItem.classList.contains('editing');

        if (editing) {
            $todoItem.classList.remove('editing');
        }
    }
}