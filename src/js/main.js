let todoList= [];
let storage = localStorage;
let count=0;

class Todo{
  constructor(id, name, completed)
  {
    this.id = id+"";
    this.name = name;
    this.completed = completed;
  }
}

window.onload= function(){
    if(storage.getItem("list")===null) return;

    const STORAGE_KEY_TODO_LIST = "list";
    const storageTodo = storage.getItem(STORAGE_KEY_TODO_LIST);
    const list = JSON.parse(storageTodo);
    count = Number.parseInt(storage.getItem("size"));
    
    list.forEach(todo =>
        {
        todoList.push(new Todo(todo.id, todo.name, todo.completed));
    });
    showItem();
}

let inputElement = document.getElementById("new-todo-title");

function enterkey(){
  if(window.event.key == 'Enter'){
    if(inputElement.value.trim()==""||null||undefined||NaN)
    {
      alert("빈 값입니다."+inputElement.value.trim());
      return ; 
    }
    addItem(inputElement.value);
  }
  inputElement.innerHTML.value ="";
}

function addItem(value)
{
  count++;
  const todo =  new Todo(count, value, false);
  todoList.push(todo);
  storage.setItem("list", JSON.stringify(todoList));
  storage.setItem("size", count+"");
  showItem();
  inputElement.value="";
}

function showItem(){
    let list ="";
    for(let i of todoList){
        let com = i.completed ? "completed" : "";
        let check = i.completed == true ? "checked" :"";
        list +="<li id=li"+i.id+" class="+com+">"
                    +"<div class=\"view\">"
                        +"<input class=\"toggle\" id=\""+i.id+"\" type=\"checkbox\""+check+">"
                        +"<label class=\"label\">"+i.name+"</label>"
                        +"<button class=\"destroy\" id="+i.id+"></button>"
                    +"</div>"
                    +"<input class=\"edit\" value="+i.name+"></li>";
    }
    document.getElementById("todo-list").innerHTML =list;
    
    const deleteButtons = document.querySelectorAll(".destroy");
    deleteButtons.forEach(deleteButton => deleteButton.addEventListener("click",deleteItem));

    const viewDivs = document.querySelectorAll(".view")
    viewDivs.forEach(viewDiv => viewDiv.addEventListener("dblclick",changeMode));
 
    const checkboxs = document.querySelectorAll(".toggle");
    checkboxs.forEach(checkbox => checkbox.addEventListener("click",changeChecked));
    
    const editInputs = document.querySelectorAll(".edit");
    editInputs.forEach(editInput => editInput.addEventListener("keydown",editKey));
  
    showListCount();
}
function editKey(event){
    if(event.key === 'Enter')
    { 
        this.setAttribute("value", this.value);
        const toggleInput = this.parentNode.firstChild.childNodes[1];
        toggleInput.innerText = this.value;
        this.parentNode.classList.remove("editing");
        updateName(this.parentNode.id, toggleInput.innerText)
        
        return;
    }
    if(event.key == 'Escape')
    {
        const boforeValue = this.previousSibling.childNodes[1].outerText;
        this.value = boforeValue;
        this.parentNode.classList.remove('editing');
    }

}

function changeChecked(){
    const checkedInput = this.parentNode.parentNode.classList;
    const updateId = this.parentNode.parentNode.id;
    if(checkedInput.contains("completed"))
    {
        checkedInput.remove("completed");
        updateCompleted(updateId, false);
    }else
    {
        checkedInput.add("completed");
        updateCompleted(updateId, true);
    }
}

function updateName(id, name){
    const realID = id.replace("li","");
    
    todoList.forEach( todo =>{
        if(todo.id === realID)
        {
            todo.name = name;  
        }    
    });
    storage.setItem("list", JSON.stringify(todoList));
    
}

function updateCompleted(id, completed){
    const realID = id.replace("li","");
    
    todoList.forEach( todo =>{
        if(todo.id === realID)
        {
            todo.completed = completed;  
        }    
    });
    storage.setItem("list", JSON.stringify(todoList));
    
}

function changeMode(){
    const liNodes = this.parentNode.parentNode.childNodes;
    liNodes.forEach(li =>
    {
        li.classList.remove('editing');
    });
    this.parentNode.classList.add('editing'); 
}

function deleteItem(){
    const id = this.getAttribute("id");
    let num =0;
    todoList.forEach( i =>
        {
        if(i.id == id)
        {
            todoList.splice(num,1);
        } 
        num++;
    });
    console.log(todoList);
    storage.setItem("list", JSON.stringify(todoList));
    showItem();
}

function showListCount(){
    const str = document.getElementById("strong");
    str.innerHTML = todoList.length;
}

function showActive(){
    const list = document.getElementById("todo-list").childNodes;
    const buttons = document.querySelectorAll('a');
    buttons.forEach(b =>b.style.border ="none");
    
    const activeButton = document.querySelector('a.active');
    activeButton.style.removeProperty('border');
    activeButton.style.borderColor = "rgba(175, 47, 47, 0.2)";
    
    list.forEach(i =>
        {
        if(i.classList.value){
            i.style.display = 'none';
        }else{
            i.style.display = '';
        }
    });
}

function showCompleted(){
    const list = document.getElementById("todo-list").childNodes;
    const buttons = document.querySelectorAll('a');
    buttons.forEach(b =>b.style.border ="none");
    
    const completedButton = document.querySelector('a.completed');
    completedButton.style.removeProperty('border');
    completedButton.style.borderColor = "rgba(175, 47, 47, 0.2)";

    list.forEach( i => 
        {
        if(!i.classList.value){
            i.style.display = 'none';
        }else
        {
            i.style.display = '';
        }
    });
}

function showAll(){
    const buttons = document.querySelectorAll('a');
    buttons.forEach(b =>b.style.border ="none");
    
    const allButton = document.querySelector('a.selected');
    allButton.style.removeProperty('border');
    allButton.style.borderColor = "rgba(175, 47, 47, 0.2)";


    const list = document.getElementById("todo-list").childNodes;
    list.forEach( i => i.style.display='');
}
