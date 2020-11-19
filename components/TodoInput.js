function TodoInput(app) {
    const $todoInput = document.querySelector('.new-todo');
    this.app = app;
   
    this.addTodo = e => {
        const todoText = e.target.value;
        if(e.keyCode === 13 && todoText !== '') {
            this.app.addTodo(todoText);
            e.target.value= ''
        }
    }
    $todoInput.addEventListener('keypress', this.addTodo);
}

export default TodoInput;