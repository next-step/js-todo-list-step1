
const $inputSchedule = document.getElementById("new-todo-title");

$inputSchedule.addEventListener('keypress', addSchedule);
console.log("jkkkk")

function addSchedule(event) {
    let ENTER_KEY = 13
    console.log(event.key);
    if(event.keyCode == ENTER_KEY) {
        var $toDoLists = document.getElementById("todo-list")
        var toDoElement = document.createTextNode($inputSchedule.innerText);
        $toDoLists.appendChild(toDoElement);
        console.log("is_enter_key_presses");
    }
}

