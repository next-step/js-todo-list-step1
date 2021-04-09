
const $inputSchedule = document.getElementById("new-todo-title");

$inputSchedule.addEventListener('keypress', addSchedule);
console.log("jkkkk")

let count = 0;
let id = 0;
function addSchedule(event) {
    let ENTER_KEY = 13
    console.log(event.key);
    if(event.keyCode == ENTER_KEY) {
        var $toDoLists = document.getElementById("todo-list");
        
      
        const $toDoItem = document.createElement('li');
        console.log($inputSchedule)
        $toDoItem.innerHTML = createTodoTemplete($inputSchedule.value, true, id);
        id += 1;
        console.log(id);
        $toDoLists.appendChild($toDoItem);
       
        console.log("is_enter_key_presses");
    }
}


function makeComplete(id) {
    id.parentNode.parentNode.class = "completed";
    id.parentNode.children[0].checked = true;
}
  

const createTodoTemplete = (text, isActive, id) => `
	<div class="view">
		<input class="toggle" type="checkbox" ${!isActive && 'checked'}/>
		<label class="label">${text}</label>
		<button class="destroy" id=${id} onclick="makeComplete(this)"></button>
	</div>
	<input class="edit" value="${text}" />
     
`;

