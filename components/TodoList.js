function TodoList(data, app) {
    this.data = data; 
    this.app = app;
    
    const $todoList = document.querySelector('.todo-list'); 
    
    this.render = () => {
        $todoList.innerHTML = this.data.map((todo, key) => {
            return( 
                `<li  class="${todo.completed ? `completed` : ' ' }" id=${todo.id}>
                    <div class="view">
                        <input class="toggle" type="checkbox" ${todo.completed ? `checked` : ''}/>
                        <label class="label">${todo.text}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="새로운 타이틀" />
                </li>`
            )
        })
    }
    
    this.toggleTodo = e => {
        if(e.target.className === 'toggle') {
            const toggleId = e.target.parentNode.parentNode.id;
            this.app.toggleTodo(toggleId);
        }
    }
    $todoList.addEventListener('click', this.toggleTodo); //다른 코드 참고해보기
    
    
    this.setState = newData => {
        this.data = newData;
        this.render();
    }
    this.render();
}

export default TodoList;