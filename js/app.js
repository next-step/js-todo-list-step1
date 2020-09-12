const $toDoForm = document.querySelector(".toDojs");
const $toDoInput = $toDoForm.querySelector(".new-todo");
const $toDoList = document.querySelector(".todo-list");
const $toDoFilter = document.querySelector(".filters");
let toDocountNum = 0;
const TODOS_LS = "toDos";
let toDos = [];


function saveToDo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function cancel(closestLi){
    closestLi.classList.remove("editing");
}
function edited(text, li){
    const label = li.querySelector(".label");
    removetoDosObj(label.innerText);
    label.innerText = text;
    li.classList.remove("editing");
    PushTodo(text, li.className === "completed" ? 'checked' : 'unchecked');
    saveToDo();
}
function count(Num){
    document.querySelector(".todo-count strong").innerHTML = Num;
} 
function handlekeyup({ target }){
    const closestInput = target.closest("input");
    const closestLi = target.closest("li");

    if ( event.key === "Enter"){
        return edited(closestInput.value, closestLi);
    }
    if(event.key === "Escape"){
        return cancel(closestLi);
    }
} 
function removetoDosObj(text){
    const index = toDos.findIndex(item => item.text === text);
    toDos.splice(index, 1);
    saveToDo();
}
function editing(closestLi){
    if( closestLi.classList.contains ("editing"))        
        closestLi.classList.remove("editing");    
    else{
        closestLi.classList.add("editing");
    }
}

const handledbclick = ({ target }) => editing(target.closest("li"));

function completed(closestLi) {
    const isCompleted = closestLi.classList.contains("completed");
    closestLi.classList[isCompleted ? 'remove' : 'add']("completed");
  }
function deleteTodoItem  (closestLi){
    const textlabel = closestLi.querySelector(".label");
    closestLi.remove();
    removetoDosObj(textlabel.innerText);
    toDocountNum = $toDoList.childElementCount;
    count(toDocountNum);
}

const PushTodo = (text, check) => toDos.push({ text, check });

function Detecting(list, val) {
    console.log(val);
    const classList = list.classList;
    const isCompleted = classList.contains('completed');
    classList.remove('hidden');
    const isAdd = (val === 'all') ||
                  (val === 'completed' && isCompleted) ||
                  (val === 'active' && !isCompleted);
    if (!isAdd) classList.add('hidden');
}

const activeOf = type => $toDoList.querySelectorAll("li")
                                 .forEach(item => Detecting(item, type));


function handleClick({ target }) {
    const closestLi = target.closest("li");
    ({
        destroy: () => deleteTodoItem(closestLi),
        toggle: () => completed(closestLi),
        active: () => activeOf('active'),
        completed: () => activeOf('completed'),
        all: () => activeOf('all'),
    })[target.className]?.();
}

function paintToDo(text,val){
   return `
   <li class=${val}>
     <div class="view">
       <input class="toggle" type="checkbox"/>
       <label class="label">${text}</label>
       <button class="destroy"></button>
     </div>
     <input class="edit" value="${text}"/>
   </li>
 `;
}

function handleSumit(event) {
    // event.preventDefault();
    $toDoList.insertAdjacentHTML("beforeend", paintToDo($toDoInput.value,""));
    PushTodo($toDoInput.value,"unchecked");
    saveToDo();
    toDocountNum = $toDoList.childElementCount;
    count(toDocountNum);
    $toDoInput.value="";
}
function loadToDos() {
    const parsedToDos = JSON.parse(localStorage.getItem(TODOS_LS));
    if (toDos === null) return;

    parsedToDos.forEach(({ check, text }) => {
        const completed = check === "checked" ? 'completed' : '';
        $toDoList.insertAdjacentHTML("beforeend", paintToDo(text, completed))
        PushTodo(text, check);
    });

    $toDoList.querySelectorAll(".completed").forEach(item => {
        item.querySelector(".toggle").checked = true;
    })
}
function init(){  
    loadToDos();
    count($toDoList.childElementCount);
    $toDoForm.addEventListener("submit", handleSumit);
    $toDoList.addEventListener("click", handleClick);
    $toDoList.addEventListener("dblclick",handledbclick);
    $toDoList.addEventListener("keyup",handlekeyup);
    $toDoFilter.addEventListener("click",handleClick);
}
init();


