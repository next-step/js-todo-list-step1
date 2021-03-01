function todoList (){
    const $input = document.querySelector('#new-todo-title');
    const $todoList = document.querySelector('#todo-list');
    const $todoCount = document.querySelector('.todo-count');
    let numTodo;
    function addTodo (event){
        let title = event.target.value;
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
        const $checkBtn = newTodoItem.querySelector('.toggle');
        const $deleteBtn = newTodoItem.querySelector('.destroy');

        $checkBtn.addEventListener('click', checkComplete => {
            if($checkBtn.checked){
                newTodoItem.classList.add('completed');
            } else {
                newTodoItem.classList.remove('completed');
            }
        });
        $deleteBtn.addEventListener('click', () => {
           $todoList.removeChild(newTodoItem);
           countTodo ();
        });
        newTodoItem.addEventListener('dblclick', () => {
            newTodoItem.classList.add('editing');
         });
         newTodoItem.addEventListener('keyup', (event) => {
            const editInputElem = newTodoItem.querySelector(".edit")
            const titleLabelElem =  newTodoItem.querySelector(".label")
            if (event.key === 'Escape'){
                newTodoItem.classList.remove('editing');
            }
            if (event.key === 'Enter'){
                newTodoItem.classList.remove('editing');
                titleLabelElem.innerText = editInputElem.value;
            }
        });
         countTodo ();  
        }   
    function countTodo (){
        let numTodo = $todoList.childElementCount;
        $todoCount.querySelector('strong').innerText= numTodo;
    }  
    $input.addEventListener('keypress', (event) => {
        if(event.target.value != ''  && event.key === 'Enter'){
            addTodo (event);
        }
    });
  
}
const todoApp = new todoList();