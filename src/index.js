// 전역 변수
const todoItemTemplate = `
<div class="view">
  <input class="toggle" type="checkbox"/>
  <label class="label">새로운 타이틀</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="새로운 타이틀" />
`;
let state = {
    condition: "all",
    items: [],
};
const todoList = document.getElementById("todo-list");

// state객체의 상태에 따라 새로고침 해주는 메소드
// state.condition 에 따라 각각 다른 리스트를 보여준다.
// 함수의 마지막에 localStorage에 저장하는 코드가 있음
function rePaint(state) {
    todoList.innerHTML = '';
    let rePaintList = [];
    if (state.condition === "all") rePaintList = state.items; 
    if (state.condition === "active") rePaintList = state.items.filter(item=> item.completed === false);
    if (state.condition === "completed") rePaintList = state.items.filter(item=> item.completed === true);

    rePaintList.forEach((item,i)=>{
        const classList = [];
        if (item.completed) classList.push("completed");
        if (item.editing) classList.push("editing");
        const li = document.createElement("li");
        li.innerHTML = todoItem;
        li.setAttribute("class", classList.join(" "));
        li.dataset.id = i;
        li.querySelector(".label").textContent = item.todo;
        li.querySelector(".edit").value = item.todo;
        li.querySelector(".edit").addEventListener("keyup", onEdit);
        li.querySelector(".toggle").addEventListener("change", onChangeCheckBox);
        if (item.completed) li.querySelector(".toggle").setAttribute("checked", item.completed);
        li.querySelector(".destroy").addEventListener("click", onClickDestroy);

        li.addEventListener('dblclick',onDoubleClickTodoItem);
        todoList.append(li);
    });
    document.querySelector("#new-todo-title").value = '';
    document.querySelector(".todo-count strong").textContent = state.items.length;
    localStorage.setItem("state", JSON.stringify(state));
}

// Events
// 이벤트들은 전역객체 상태값을 변경하고, 함수의 마지막 부분에서 rePaint 함수를 실행시킨다.
function onChangeCheckBox(e) {
    const li = e.target.parentNode.parentNode;
    const targetId = li.dataset.id;
    const origin = state.items[targetId];
    origin.completed = e.target.checked;
    rePaint(state);
}
function onClickDestroy(e) {
    const li = e.target.parentNode.parentNode;
    const targetId = li.dataset.id;
    state.items.splice(targetId,1);
    rePaint(state);
}
function onDoubleClickTodoItem(e) {
    const li = e.target.parentNode.parentNode;
    const targetId = li.dataset.id;
    const origin = state.items[targetId];
    origin.editing = true;
    // li.querySelector(".edit").focus();
    rePaint(state);
}
function onEdit(e) {
    const li = e.target.parentNode;
    const targetId = li.dataset.id;
    if(e.keyCode === 27) {
        state.items[targetId].editing = false;
        rePaint(state);
    }
    if(e.keyCode === 13) {
        state.items[targetId] = {...state.items[targetId], todo: e.target.value, editing: false};
        rePaint(state);
    }
}
function onKeyUpEnter(e) {
    if(e.keyCode === 13) {
        const item = {
            todo: e.target.value,
            completed: false,
            editing: false
        }
        state.items = [...state.items, item];
        rePaint(state);
    }
}

// 초기화 함수
// todoItem들을 제외한 요소들에 event를 등록한다.
// localStorage에 기존에 저장된 상탯값이 있다면 그 것으로 state를 초기화한다.
// 함수의 마지막에 rePaint를 실행한다.
function Initialize() {
    const localState = JSON.parse(localStorage.getItem("state"));
    if (localState) {
        state = {
            ...localState
        };
    }
    const todoInput = document.getElementById("new-todo-title");
    todoInput.addEventListener("keyup", onKeyUpEnter);
    const activeConditionBtn = document.querySelector("a.active");
    const completedConditionBtn = document.querySelector("a.completed");
    const allConditionBtn = document.querySelector("a.all");
    allConditionBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        state.condition = "all";
        rePaint(state);
    });
    activeConditionBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        state.condition = "active";
        rePaint(state);
    });
    completedConditionBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        state.condition = "completed";
        rePaint(state);
    });

    rePaint(state);
}

// onload 이벤트
// load시 초기화함수 Initialize를 실행시킨다.
window.addEventListener("load", Initialize);
=======
const inputNewTodo = document.getElementById('new-todo-title');

const handleInput = (e) => {
  if (e.key === 'Enter') {
    //
  }
};

inputNewTodo.addEventListener('keypress', handleInput);
