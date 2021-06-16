import TodoCount from './component/todoCount.js';
import TodoInput from './component/todoInput.js';
import TodoList from './component/todoList.js';
import TodoFilter from './component/todoFilter.js';

export default class App {
    list;
    count;
    storage;
    constructor($target) {
        this.storage = window.localStorage;
        this.$target = $target;
        console.log(this.$target);
        this.setup();
    }

    setup() {
        if (this.storage.getItem('list') !== null) {
            this.list = JSON.parse(this.storage.getItem('list'));
        } else {
            this.list = [];
        }
        console.log(this.list);
        if (this.storage.getItem('size') == null) {
            this.storage.setItem('size', 0);
        }
        this.count = Number.parseInt(this.storage.getItem('size'));
        this.mounted();
    }
    template() {
        return ``;
    }

    mounted() {
        const { onkeydown } = this;
        new TodoInput(document.querySelector('.new-todo'), {
            onkeydown: onkeydown.bind(this),
        });
        new TodoList(document.querySelector('#todo-list'), '');
        new TodoCount(document.querySelector('.todo-count'), '');
        new TodoFilter(document.querySelector('.filters'), '');
    }

    onkeydown(content) {
        const id = this.count + 1;
        const complete = false;
        this.list = [...this.list, { id, content, complete }];
        console.log(this.list);
        this.count++;
        this.storage.setItem('list', JSON.stringify(this.list));
        this.storage.setItem('size', id);
    }
}

new App(document.querySelector('.todoapp'));

// function showItem(){
//     let list ="";
//     for(let todo of todoList){
//         let com = todo.completed ? "completed" : "";
//         let check = todo.completed ? "checked" :"";
//         list +="<li id=li"+todo.id+" class="+com+">"
//                     +"<div class=\"view\">"
//                         +"<input class=\"toggle\" id=\""+todo.id+"\" type=\"checkbox\""+check+">"
//                         +"<label class=\"label\">"+todo.name+"</label>"
//                         +"<button class=\"destroy\" id="+todo.id+"></button>"
//                     +"</div>"
//                     +"<input class=\"edit\" value="+todo.name+"></li>";
//     }
//     document.getElementById("todo-list").innerHTML =list;

//     const deleteButtons = document.querySelectorAll(".destroy");
//     deleteButtons.forEach(deleteButton => deleteButton.addEventListener("click",deleteItem));

//     const viewDivs = document.querySelectorAll(".view")
//     viewDivs.forEach(viewDiv => viewDiv.addEventListener("dblclick",changeMode));

//     const checkboxs = document.querySelectorAll(".toggle");
//     checkboxs.forEach(checkbox => checkbox.addEventListener("click",changeChecked));

//     const editInputs = document.querySelectorAll(".edit");
//     editInputs.forEach(editInput => editInput.addEventListener("keydown",editKey));

//     showListCount();
// }
// function editKey(event){
//     if(event.key === 'Enter')
//     {
//         this.setAttribute("value", this.value);
//         const toggleInput = this.parentNode.firstChild.childNodes[1];
//         toggleInput.innerText = this.value;
//         this.parentNode.classList.remove("editing");
//         updateName(this.parentNode.id, toggleInput.innerText)

//         return;
//     }
//     if(event.key == 'Escape')
//     {
//         const boforeValue = this.previousSibling.childNodes[1].outerText;
//         this.value = boforeValue;
//         this.parentNode.classList.remove('editing');
//     }

// }

// function changeChecked(){
//     const checkedInput = this.parentNode.parentNode.classList;
//     const updateId = this.parentNode.parentNode.id;
//     if(checkedInput.contains("completed"))
//     {
//         checkedInput.remove("completed");
//         updateCompleted(updateId, false);
//     }else
//     {
//         checkedInput.add("completed");
//         updateCompleted(updateId, true);
//     }
// }

// function updateName(id, name){
//     const realID = id.replace("li","");

//     todoList.forEach( todo =>{
//         if(todo.id === realID)
//         {
//             todo.name = name;
//         }
//     });
//     storage.setItem("list", JSON.stringify(todoList));

// }

// function updateCompleted(id, completed){
//     const realID = id.replace("li","");

//     todoList.forEach( todo =>{
//         if(todo.id === realID)
//         {
//             todo.completed = completed;
//         }
//     });
//     storage.setItem("list", JSON.stringify(todoList));

// }

// function changeMode(){
//     const liNodes = this.parentNode.parentNode.childNodes;
//     liNodes.forEach(li =>
//     {
//         li.classList.remove('editing');
//     });
//     this.parentNode.classList.add('editing');
// }

// function deleteItem(){
//     const id = this.getAttribute("id");
//     let num =0;
//     todoList.forEach( i =>
//         {
//         if(i.id == id)
//         {
//             todoList.splice(num,1);
//         }
//         num++;
//     });
//     console.log(todoList);
//     storage.setItem("list", JSON.stringify(todoList));
//     showItem();
// }

// function showListCount(){
//     const str = document.getElementById("strong");
//     str.innerHTML = todoList.length;
// }

// function showActive(){
//     const list = document.getElementById("todo-list").childNodes;
//     const buttons = document.querySelectorAll('a');
//     buttons.forEach(b =>b.style.border ="none");

//     const activeButton = document.querySelector('a.active');
//     activeButton.style.removeProperty('border');
//     activeButton.style.borderColor = "rgba(175, 47, 47, 0.2)";

//     list.forEach(i =>
//         {
//         if(i.classList.value){
//             i.style.display = 'none';
//         }else{
//             i.style.display = '';
//         }
//     });
// }

// function showCompleted(){
//     const list = document.getElementById("todo-list").childNodes;
//     const buttons = document.querySelectorAll('a');
//     buttons.forEach(b =>b.style.border ="none");

//     const completedButton = document.querySelector('a.completed');
//     completedButton.style.removeProperty('border');
//     completedButton.style.borderColor = "rgba(175, 47, 47, 0.2)";

//     list.forEach( i =>
//         {
//         if(!i.classList.value){
//             i.style.display = 'none';
//         }else
//         {
//             i.style.display = '';
//         }
//     });
// }

// function showAll(){
//     const buttons = document.querySelectorAll('a');
//     buttons.forEach(b =>b.style.border ="none");

//     const allButton = document.querySelector('a.selected');
//     allButton.style.removeProperty('border');
//     allButton.style.borderColor = "rgba(175, 47, 47, 0.2)";

//     const list = document.getElementById("todo-list").childNodes;
//     list.forEach( i => i.style.display='');
// }
