let testItems = [
    {id: 1, title: "테스트입니다 1",completed: false},
    {id: 2, title: "테스트입니다 2",completed: true},
    {id: 3, title: "테스트입니다 3",completed: false}
];
let filterState = "all";
const toDoInput = document.getElementById("new-todo-title");
const todoListEl = document.getElementById('todo-list');
const countContainerEl = document.querySelector(".count-container");
const todoCountEl = document.querySelector(".todo-count");
const filterEls = document.querySelectorAll(".filters a");
const allEl = document.querySelector(".all");
const activeEl = document.querySelector(".active");
const completedEl = document.querySelector(".completed");

const addToDos = (item)=>{
    todoListEl.insertAdjacentHTML("beforeend",renderTodoItemTemplate(item));
    toDoInput.value="";
}

const addToItems = (item)=>{
    testItems = [item, ...testItems];    
}

const removeFromItems=(li)=>{
    const testItemId = li.dataset.id;
    testItems = testItems.filter(item => `${item.id}` !== testItemId);
}

const handleNewTodoSubmit=(event)=>{
    const newItem = {
        id: Date.now(),
        title: event.target.value,
        completed: false
    }

    addToItems(newItem);
    addToDos(newItem);
    handleCount(testItems.length);
    if(filterState === "completed"){
        renderCompleteItems();
    } else if (filterState === "active"){
        renderActiveItems();
    }

};

const itemsUpdate=(event)=>{

    const currentLi = event.target.closest('li')
    const currentItemId = currentLi.dataset.id;
    for(let obj of testItems){

        if(obj.completed === false && obj.id === parseInt(currentItemId)){
            obj.completed = true;
            
        } else if(obj.completed === true && obj.id === parseInt(currentItemId)){
            obj.completed = false;
        }
    }
    if(filterState === "completed"){
        renderCompleteItems();
    } else if (filterState === "active"){
        renderActiveItems();
    }

   
    console.log(testItems);
}
    
const handleComplete=(event)=>{
    event.target.closest("li").classList.toggle("completed");
    event.target.closest("input").classList.toggle("checked");
    itemsUpdate(event);
}


const handleDestory=(event)=>{
    const li = event.target.parentNode.parentNode;
    removeFromItems(li);
    todoListEl.removeChild(li);

    handleCount(testItems.length);
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

const handleCount=(length)=>{
    todoCountEl.innerHTML = `총 <strong>${length}</strong> 개`
}

const renderTodoItemTemplate=(item)=>{
    return (
     `<li data-id="${item.id}" class="${item.completed ? "completed" : ""}">
        <div class="view">
            <input class="toggle" type="checkbox" ${item.completed ? "checked" : ""}/>
            <label class="label">${item.title}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀" />
    </li>`);
};

const viewAllClick = (event)=>{
    event.preventDefault();
    filterState = "all";
    filterEls.forEach((el) => {
        el.classList.remove("selected");
        
    });
    allEl.classList.add("selected");

    todoListEl.innerHTML = "";
    testItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(testItems.length);
}

const renderActiveItems = () => {
    todoListEl.innerHTML = "";
    const activeItems = testItems.filter(item => item.completed === false );
    activeItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(activeItems.length);
}

const viewActiveClick = (event)=>{
    event.preventDefault();
    filterState = "active";

    filterEls.forEach((el) => {
        el.classList.remove("selected");
    });
    activeEl.classList.add("selected");

    renderActiveItems();
}

const renderCompleteItems = () =>{
    
    todoListEl.innerHTML = "";
    let completedItems = testItems.filter(item => item.completed === true );
    completedItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(completedItems.length);
}
const viewCompletedClick = (event)=>{
    event.preventDefault();
    filterState = "completed";
    filterEls.forEach((el) => {
        el.classList.remove("selected");
    });
    completedEl.classList.add("selected");
    
    renderCompleteItems();
}


function init() {
    console.log("start app");
    todoListEl && todoListEl.addEventListener("click",handleTodoItemClick);
    toDoInput && toDoInput.addEventListener( "change",handleNewTodoSubmit); 
    allEl && allEl.addEventListener("click",viewAllClick);
    activeEl && activeEl.addEventListener("click",viewActiveClick);
    completedEl && completedEl.addEventListener("click",viewCompletedClick);
    

    // localStorage 작업 예정

    testItems.forEach((item) => {
        addToDos(item)
    });
    handleCount(testItems.length);
   
}

init();
