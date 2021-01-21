const toDoInput = document.getElementById("new-todo-title");
const ul = document.getElementById('todo-list');


const addToDos=(text)=>{
    ul.insertAdjacentHTML("beforeend",renderTodoItemTemplate(text));
    toDoInput.value="";
}

const handleNewTodoSubmit=(event)=>{
    const todoItem =  event.target.value;
    addToDos(todoItem); 
};


const handleComplete=(event)=>{
    event.target.closest("li").classList.toggle("completed");
    event.target.closest("input").classList.toggle("checked");
}

const handleDestory=(event)=>{
    const li = event.target.parentNode.parentNode;
    ul.removeChild(li);
}

const handleEdit=(event)=>{
    // 더블클릭시 input으로 변경
   const li =  event.target.closest('li');
   li.classList.toggle("editing class");
}

const handleTodoItemClick=(event)=>{
    const targetClass = event.target.className.split(" ");
    
    if(targetClass[0] === "toggle") handleComplete(event);
    else if(targetClass[0] === "destroy") handleDestory(event);
    //else if (targetClass[0] === "label") handleEdit(event);

}
const renderTodoItemTemplate=(title)=>{
    return (
     `<li>
        <div class="view">
        <input class="toggle" type="checkbox"/>
        <label class="label">${title}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
    </li>`);
};


ul && ul.addEventListener("click",handleTodoItemClick);
toDoInput && toDoInput.addEventListener( "change",handleNewTodoSubmit);                                                         