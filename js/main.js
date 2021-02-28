function todoList (){
    const $input = document.querySelector('#new-todo-title');
    const $todoList = document.querySelector('#todo-list');
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
        const checkBtn = document.querySelector('.toggle');
        checkBtn.addEventListener('click', checkComplete => {
            if(checkBtn.checked){
                newTodoItem.classList.add('completed');
            } else {
                newTodoItem.classList.remove('completed');
            }
        });
        
    }
  
    $input.addEventListener('keypress', (event) => {
        if(event.target.value != ''  && event.key === 'Enter'){
            addTodo (event);
        }
    });
  
}
const todoApp = new todoList();
// - [ ] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가, input 태그에 checked 속성 추가) 