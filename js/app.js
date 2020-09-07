import todoItem from './todoItem.js';
import filterItem from './filterItem.js';
let ID = 0;
let DATA = []; // {id, context, complete}
let HASH = "all";



/************* element select & event setting ****************/ 
const $todoInputElement = document.getElementById('new-todo-title');
const $todoListElement = document.getElementById('todo-list');
const $filtersElement = document.querySelector('.filters');
const $countElement = document.querySelector('.todo-count strong')

$todoInputElement.addEventListener('keyup', (event) => {
	const key = event.key;
	const valueTrim = event.target.value.trim()

    if (key === "Enter" && valueTrim) {
        let data = {
            id: ID++,
            context: valueTrim,
            complete: false
		}
		inputEvent(data)
		render()
		$todoInputElement.value = '';
    }
})
$todoListElement.addEventListener('keyup', (event) => {
	const key = event.key;
	const target = event.target;
	const parent = target.parentElement;
	const valueTrim = event.target.value.trim()
	let labelElement = parent.querySelector('label')

	if (key === 'Escape') {
		parent.classList.remove('editing')
		target.value = labelElement.innerHTML
	} else if ( key === 'Enter' && valueTrim) {
		let index = parent.id.split('-')[1]
		DATA[index].context = valueTrim
		render()
	}

})
// toggle change event 
$todoListElement.addEventListener('change', (event) => {
	const target = event.target;
	const targetId = target.parentElement.id

	if (target.id) {
		DATA.forEach((v, i, a) => {
			if ( `item-${v.id}` === targetId ) {
				v.complete = !v.complete;
			}
		})
		render();
	}
})
// button click event
$todoListElement.addEventListener('click', (event) => {
	const target = event.target
	const targetId = target.parentElement.id
	
	if (target.className === 'destroy') {
		DATA = DATA.filter((v) => {
			return ( `item-${v.id}` === targetId ) ? false : true;
		})
		render();
	}
})


// 입력된 값 수저하는 기능
$todoListElement.addEventListener('dblclick', (event) => {
	const target = event.target 
	const parent = target.parentElement
	parent.classList.add('editing')
})
window.addEventListener('hashchange', (event) => {
	HASH = event.newURL.split('#')[1] || 'all'
	render();
})

/**************** App logic ****************/
const inputEvent = (newData) => {
	DATA.push(newData)
}
const render =  () => {
	let filteredData = DATA.filter((v) => {
		if (HASH === 'completed') {
			return (v.complete) ? true : false
		} else if (HASH === 'active') {
			return !(v.complete) ? true : false
		} else {
			return true
		}
	})
	
	$todoListElement.innerHTML = filteredData.map( (item) => todoItem(item) ).join('')
	$countElement.innerHTML = filteredData.length;
	$filtersElement.innerHTML = filterItem(HASH)
}
