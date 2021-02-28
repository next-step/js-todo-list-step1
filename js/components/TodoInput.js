export default function TodoInput({ $el, addTodoItem }) {

    this.init = () => {
        this.$el = $el;
        this.$el.innerHTML = `
            <input
                id="new-todo-title"
                class="new-todo"
                placeholder="할일을 추가해주세요"
                autofocus
            />
        `;

        const $todoInput = document.querySelector('#new-todo-title');
        $todoInput.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
              const todoText = $todoInput.value;

              if (validateTodoItem({todoText})) {
                addTodoItem({todoText});
                $todoInput.value = '';
              }
            }
        });

        this.render();
    };

    this.setState = () => {
        this.render();
    };

    this.render = () => {
        
    };

    this.init();

    return this;
}

/**
 * @param {string} todoText
 * @returns {boolean}
 */
function validateTodoItem({todoText}) {
    return todoText !== '';
}