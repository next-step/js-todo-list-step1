
const $inputSchedule = document.getElementById("new-todo-title");

$inputSchedule.addEventListener('keypress', addSchedule);


let count = 0;
let id = 0;
function addSchedule(event) {
    let ENTER_KEY = 13
    console.log(event.key);
    if(event.keyCode == ENTER_KEY) {
        var $toDoLists = document.getElementById("todo-list");
        
      
        const $toDoItem = document.createElement('li');
        console.log($inputSchedule)
        $toDoItem.innerHTML = createTodoTemplete($inputSchedule.value, true);
        id += 1;
        console.log(id);
        $toDoLists.appendChild($toDoItem);
       
        console.log("is_enter_key_presses");
    }
}


function makeComplete(id) {

    id.parentNode.parentNode.classList.add("completed");
    id.parentNode.children[0].setAttribute("checked", true);
}
  
function deleteElement(id) {
    li = id.parentNode.parentNode;
    li.remove();
}

function changeToEditMode(id) {
    console.log("ischanged");
    id.parentNode.parentNode.classList.add("editing");
    console.log(id.parentNode.parentNode)
}

const createTodoTemplete = (text, isActive) => `
    
	<div class="view">
		<input class="toggle" type="checkbox" ${!isActive && 'checked'} onclick="makeComplete(this)"/>
		<label class="label" ondblclick="changeToEditMode(this)">${text}</label>
		<button class="destroy" onclick="deleteElement(this)"></button>
	</div>
	<input class="edit" value="${text}" />
     
`;

