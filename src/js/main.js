let todoList= [];
let conut = 0;

class Todo{
  constructor(id, name, completed){
    this.id = id;
    this.name = name;
    this.completed = completed;
  }
}

let inputElement = document.getElementById("new-todo-title");
/*
  todo를 추가하기 위해 키를 누를 때 발생하는 이벤트함수
 */  
function enterkey(){
  if(window.event.keyCode == 13){
    if(inputElement.value==""||null||undefined||NaN){
      alert("빈 값입니다.")
    }
    addItem(inputElement.value);
  }
}

function addItem(value){
  console.log("addItem")
  let todo =  new Todo(conut, value, false);
  todoList.push(todo);
  showItem(todo);
}

function showItem(todo){
  let target =  document.getElementById('todo-list');
  let li_list = document.createElement('li');
  let input_checked = document.createElement('input');
  input_checked.setAttribute("type","checkbox");
  li_list.setAttribute("class","completed"); 

  let text =  document.createTextNode(todo.name);
  li_list.appendChild(input_checked);
  li_list.appendChild(text);

  target.appendChild(li_list);
}