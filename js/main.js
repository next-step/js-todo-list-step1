function todoList (){
    const $input = document.querySelector('#new-todo-title');
    const $todoList = document.querySelector('#todo-list');
    $input.addEventListener('keypress', (event) => {
        if(event.target.value != ''  && event.key === 'Enter'){
            addTodo (event);
        }
    });
    function addTodo (event){
        const title = event.target.value;
        const newTodoItem = document.createElement('li');
        $todoList.appendChild(newTodoItem);
            newTodoItem.innerHTML=`
                <div class="view">
                    <input class="toggle" type="checkbox"/>
                    <label class="label">${title}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${title}" />
            `
        this.event.target.value = ''  ;
    }
}
const todoApp = new todoList();