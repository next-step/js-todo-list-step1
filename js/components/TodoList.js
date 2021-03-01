export default function TodoList({ $parent, todoItems = [], toggleTodoItem, removeTodoItem, updateTodoItem }) {
    
    this.init = () => {
        this.$el = document.createElement('div');
        $parent.appendChild(this.$el);

        this.todoItems = todoItems.map(todoItem => {
            return {
                ...todoItem,
                isEditing: false,
            };
        });
       
        this.$el.addEventListener('click', event => {
            event.stopPropagation();
            if (event.target.classList.contains('toggle')) {
                const $todoItem = event.target.closest('li');
                toggleTodoItem(({todoId: $todoItem.dataset.todoId}));
            }

            if (event.target.classList.contains('destroy')) {
                const $todoItem = event.target.closest('li');
                removeTodoItem(({todoId: $todoItem.dataset.todoId}));
            }
        });
        this.$el.addEventListener('dblclick', event => {
            event.stopPropagation();
            const $todoItem = event.target.closest('li');
            if ($todoItem) {
                const todoId = $todoItem.dataset.todoId;
                const index = this.todoItems.findIndex(({id}) => id === todoId);
                this.todoItems[index].isEditing = true;

                this.render();
            }
        });
        this.$el.addEventListener('keypress', event => {
            event.stopPropagation();
            if (!event.target.classList.contains('edit')) {
                return;
            }
            
            if (event.key === 'Enter') {
                const $todoItem = event.target.closest('li');
                const todoId = $todoItem.dataset.todoId;

                updateTodoItem({todoId, updatedText: event.target.value});
            }
            if (event.key === 'Escape') {
                this.cancelEditing();
            }
        });
        this.$el.addEventListener('focusout', event => {
            event.stopPropagation();
            if (event.target.classList.contains('edit')) {
                this.cancelEditing();
            }
        });

        this.render();
    };

    this.setState = ({todoItems}) => {
        this.todoItems = todoItems.map(todoItem => {
            return {
                ...todoItem,
                isEditing: false,
            };
        });
        this.render();
    };

    this.render = () => {
        this.$el.innerHTML = `
            <ul id="todo-list-items" class="todo-list"></ul>
        `;

        const $todoListItems = this.$el.querySelector('#todo-list-items');
        $todoListItems.innerHTML = this.todoItems.map(({id, text, checked, isEditing}) => {
            return `
                <li id="todo-item-${id}" data-todo-id="${id}" class="${makeTodoItemClassNames({checked, isEditing})}">
                    <div class="view">
                        <input class="toggle" type="checkbox" ${checked ? 'checked' : ''}/>
                        <label class="label">${text}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${text}" />
                </li>
            `;
        }).join('');

        //editing input focuing
        const editingTodoItemIndex = this.todoItems.findIndex(todoItem => todoItem.isEditing);
        if (editingTodoItemIndex > -1) {
            const $todoItem = $todoListItems.querySelector(`#todo-item-${this.todoItems[editingTodoItemIndex].id}`);
            const $todoItemEditInput = $todoItem.querySelector('.edit');
            const textLength = $todoItemEditInput.value.length;
            $todoItemEditInput.focus();
            $todoItemEditInput.setSelectionRange(textLength, textLength);
        }
    };

    this.cancelEditing = () => {
        this.todoItems = this.todoItems.map(todoItem => {
            return {
                ...todoItem,
                isEditing: false,
            };
        })
        this.setState({todoItems: this.todoItems});
    }

    this.init();

    return this;
}

function makeTodoItemClassNames({checked, isEditing}) {
    const classNames = [];
    if (checked) {
        classNames.push('completed');
    }
    if (isEditing) {
        classNames.push('editing');
    }

    return classNames;
}