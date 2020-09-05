const DATA = []
let ID = 0;
let filter = window.location.hash.slice(1) || 'all';

const todoInputElement = document.getElementById('new-todo-title')
const todoListElement = document.getElementById('todo-list')

const todoRender = ({id, context, complete})=>`
	<li>${context}</li>
`;

const todoListRender = (todoList) => todoList.map(todo=>todoRender(todo)).join('');

const dataPush = (data) => {
	DATA.push(data);
	todoListElement.innerHTML = todoListRender(DATA);
	console.log(todoListRender(DATA))
	todoInputElement.value = '';
}

todoInputElement.addEventListener('keyup', (event) => {
	const {key, target:{value}} = event;
    if (key === "Enter") {
        let data = {
            id: ID++,
            context: value,// input value
            complete: false
        }
		dataPush(data);
    }
})


todoListElement.addEventListener('dblclick', (event) => {
    // 입력된 값 수저하는 기능
})

const renderFilters = (filter) => `
		<li>
		  <a class="all${filter==='all'?' selected':''}" href="/#">전체보기</a>
		</li>
		<li>
		  <a class="active${filter==='active'?' selected':''}" href="#active">해야할 일</a>
		</li>
		<li>
		  <a class="completed${filter==='completed'?' selected':''}" href="#completed">완료한 일</a>
		</li>
`;


window.addEventListener('hashchange', ()=>{
	filter = window.location.hash.slice(1)||'all';
	renderFilters(filter);
})