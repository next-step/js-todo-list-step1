const newTodo = document.getElementById("new-todo-title");
const toDoList = document.getElementById("todo-list");
const totalCount = document.querySelector(".todo-count");
const filters = document.querySelector(".filters");


newTodo.addEventListener('keyup', addToDo);
toDoList.addEventListener('click', toDoClick);
toDoList.addEventListener('dblclick', toDoEdit);
toDoList.addEventListener('keyup', toDoKeyup);
filters.addEventListener('click', toDoFilter);

const TODOS_LIST = 'todosList';
let toDos = [];

//리스트에 추가
function addToDo(event) {
    //해야할 일, 완료한 일 선택 후 입력 시 전체보기로 바꿈
    if(event.key === "Enter" && newTodo.value.replace(/(\s*)/g, "")!==""){
        if(toDos){
            setClassName("all");
            patchToDo(toDos)
        }
        //마지막요소 가져오기
        const toDoId = toDos.length == 0 ? 1 : toDos[toDos.length-1].id+1;
        const text = event.target.value;
        toDoList.innerHTML += `
        <li id=${toDoId}>
            <input class="toggle" type="checkbox"/>
            <label class="label">${text}</label>
            <button class="destroy"></button>
        <input class="edit" value=${text} />
        </li>`
        ;
        const toDoObj = {
            id: toDoId, 
            text: text,
            tDClass : ''
        };
        toDos.push(toDoObj);
        saveToDos();
        //카운트
        totalCount.innerHTML = toDos.length;
        //초기화
        newTodo.value = "";
        //todolist저장
    }
}
//토글클릭
function toDoClick(event){
    const thisToDoId = event.target.parentNode.id;
    const thisToDo = document.getElementById(thisToDoId);
    switch(event.target.className){
        case("toggle") : 
            toDoToggle(thisToDo);
            break;
        case("destroy") : 
            toDoDestroy(thisToDo);
            break;
    }
}
function toDoToggle(toDo){
    toDo.className==""? toDo.className="completed" : toDo.className="";
    toDos[toDo.id-1].tDClass = toDo.className;
    saveToDos();
}


function toDoDestroy(toDo){
    toDo.remove();
    const removeToDos = toDos.filter((tD)=>{
        return tD.id !== parseInt(toDo.id);
    });
    toDos = removeToDos;
    saveToDos();
    totalCount.innerHTML = toDoList.getElementsByTagName('li').length;
}
//로컬스토리지 저장
function saveToDos() {
    localStorage.setItem(TODOS_LIST, JSON.stringify(toDos));
}

//수정
function toDoEdit(event){
    const thisToDoId = event.target.parentNode.id;
    const thisToDo = document.getElementById(thisToDoId);
    thisToDo.className="editing";
    thisToDo.querySelector(".edit").select();
}

function toDoKeyup(event){
    const thisToDoId = event.target.parentNode.id;
    const thisToDo = document.getElementById(thisToDoId);
    const editedText = event.target.value;
    switch(event.key){
        case 'Enter':
            thisToDo.querySelector("label").innerHTML = editedText;
            thisToDo.querySelector(".edit").innerHTML = editedText;
            var index = toDos.findIndex(toDo=>{
                return toDo.id == parseInt(thisToDoId)
              });
            toDos[index].text = editedText;
            thisToDo.className="";
            saveToDos();
        case 'Escape':
            thisToDo.className="";
    }

}

//todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기 
function toDoFilter(event){
    const todoClassName = event.target.className;
    switch(todoClassName){
        case("active"):
            let activeTodos = toDos.filter(todo=>todo.tDClass!=='completed');
            setClassName(todoClassName);
            patchToDo(activeTodos);
            return;
        case("completed"):
            let compTodos = toDos.filter(todo=>todo.tDClass=='completed');
            setClassName(todoClassName);
            patchToDo(compTodos);
            return;
        case("all"):
            patchToDo(toDos);
            setClassName(todoClassName);
            return;
    }
}
//버튼 상태 변경
function setClassName(todoClassName){
    const allBtn = document.querySelector("a.all");
    const activeBtn = document.querySelector("a.active");
    const completedBtn = document.querySelector("a.completed");
    switch(todoClassName){
        case("active"):
            allBtn.classList.remove("selected");
            activeBtn.classList.add("selected");
            completedBtn.classList.remove("selected");
            return;
        case("completed"):
            allBtn.classList.remove("selected");
            activeBtn.classList.remove("selected");
            completedBtn.classList.add("selected");
            return;
        case("all"):
            allBtn.classList.add("selected");
            activeBtn.classList.remove("selected");
            completedBtn.classList.remove("selected");
            return;
    }
}

function patchToDo(filterToDos){
    toDoList.innerHTML = '';
    filterToDos.forEach(todo=>{
        toDoList.innerHTML += `
        <li id=${todo.id} class=${todo.tDClass} >
            <input class="toggle" type="checkbox" ${todo.tDClass ?'checked':''}/>
            <label class="label">${todo.text}</label>
            <button class="destroy"></button>
        <input class="edit" value=${todo.text} />
        </li>`
        ;
    });
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LIST);
    if(loadedToDos){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach((todo)=>{
            toDos.push(todo);
        });
        totalCount.innerHTML = toDos.length;
        patchToDo(toDos);
    }
}

function init(){
    loadToDos()
}

init()