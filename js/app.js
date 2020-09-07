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
    if (key === "Enter" && valueTrim) {
        let data = {
            id: ID++,
            context: valueTrim,// input value
            complete: false
		}
		inputEvent(data)
		render()
		$todoInputElement.value = '';
    }
})
// toggle change event 
$todoListElement.addEventListener('change', (event) => {
	console.log('change', event);
	const target = event.target;
	const targetId = target.parentElement.className
	console.log('targetId', targetId);
	// 몇번째 아이템인지 구별이 가는가? 
	DATA.forEach((v, i, a) => {
		if ( v.id === parseInt(targetId) ) {
			v.complete = !v.complete;
		}
	})
	console.log('after', DATA);
	render();
})

// button click event
// $todoListElement.addEventListener('click', (event) => {
// 	console.log('click event', event);
// 	const target = event.target
	
// 	if (target === 'label') {

// 	}
// })


// 입력된 값 수저하는 기능
$todoListElement.addEventListener('dblclick', (event) => {
	console.log('double click event', event);
	const target = event.target 

	if (target === 'label') {

	}
})

// filter click event
$filtersElement.addEventListener('click', (event) => {
	console.log('filters', event);
})

/**************** App logic ****************/
const inputEvent = (newData) => {
	DATA.push(newData)
	console.log('inputEvent', newData, DATA);
}
const render =  () => {
	$todoListElement.innerHTML = DATA.map( (item) => todoItem(item) ).join('')
}
