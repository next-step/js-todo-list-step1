function TodoList(data, app) {
    this.data = data; 
    this.app = app;
    
    const $todoList = document.querySelector('.todo-list'); 
    
    this.render = () => {
        $todoList.innerHTML = this.data.map((todo, key) => {
            return( 
                `<li  class="${todo.completed ? `completed` : ' ' } " id=${todo.id}>
                    <div class="view">
                        <input class="toggle" type="checkbox" ${todo.completed ? `checked` : ''}/>
                        <label class="label">${todo.text}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${todo.text}" />
                </li>`
            )
        }).join('')
    }
    
     this.editMode = e => {
        if(e.target.className === 'label') {
            e.target.closest('li').classList.add('editing');
        }
    }
    $todoList.addEventListener('dblclick', this.editMode);
    
    this.editTodo = e => {
        if(e.target.className === 'edit') {
            const editedText = e.target.value;
            const id = e.target.closest('li').id;
            
           if(e.key === 'Enter') {
                this.app.editTodo(editedText, id);
            }else if(e.key === 'Escape') {
                e.target.closest('li').classList.remove('editing');
            }
        }
    }
    $todoList.addEventListener('keydown', this.editTodo);
    
    this.toggleTodo = e => {
        if(e.target.className === 'toggle') {
            const toggleId = e.target.closest('li').id;
            //console.log(toggleId)
            this.app.toggleTodo(toggleId);
        }
    }
    $todoList.addEventListener('click', this.toggleTodo); //다른 코드 참고해보기
    
    this.deleteTodo = e => {
        const deleteId = e.target.closest('li').id;
        if(e.target.className === 'destroy') {
            this.app.deleteTodo(deleteId)
        }
    }
    $todoList.addEventListener('click', this.deleteTodo);
    
    this.setState = newData => {
        this.data = newData;
        this.render();
    }
    this.render();
}

export default TodoList;