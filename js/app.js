import todoItem from './todoItem.js';
let ID = 0;
const DATA = [];
// {id, context, complete}


/************* element select & event setting ****************/ 
const $todoInputElement = document.getElementById('new-todo-title');
const $todoListElement = document.getElementById('todo-list');
const $filtersElement = document.querySelector('.filters');

$todoInputElement.addEventListener('keyup', (event) => {
	const key = event.key;
	const valueTrim = $todoInputElement.value.trim()
    if (key === "Enter") {
        let data = {
            id: ID + 1,
            context: valueTrim,// input value
            complete: false
		}
		inputEvent(data)
		render()
		$todoInputElement.value = '';
    }
})
// toggle change event 

// button click event


// 입력된 값 수저하는 기능
$todoListElement.addEventListener('dblclick', (event) => {
})

// filter click event


/**************** App logic ****************/
const inputEvent = (newData) => {
	DATA.push(newData)
	console.log('inputEvent', newData, DATA);
}
const render =  () => {
	$todoListElement.innerHTML = DATA.map( (item) => todoItem(item) ).join('')
}
