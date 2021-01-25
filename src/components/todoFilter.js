import { filterTypes } from '../utils/constants.js';
import todoList from './todoList.js';

const todoFilter = () => {
	const $filtersUl = document.querySelector('.filters');

	const filters = [
		{ text: '전체보기',  hash:'#', type: filterTypes.ALL },
		{ text: '해야할 일', hash:'#active', type: filterTypes.ACTIVE },
		{ text: '완료한 일', hash:'#completed', type: filterTypes.COMPLETED },
	];

	function onClickHandler() {
		$filtersUl.addEventListener('click', e => {
			let selectedFiter = e.target.className.split(' ')[0];
			render(selectedFiter);
			todoList(selectedFiter);
		});
	}

	function render(selectedFiter = filterTypes.ALL) {
		const filterList = filters.map(filter => {
			return (`
			<li>
				<a class="${filter.type} ${filter.type === selectedFiter ? 'selected': ''}" 
					href="${filter.hash}"
				>
					${filter.text}
				</a>
			</li>`)
		}).join("");
		$filtersUl.innerHTML = filterList;
	}

	render();
	onClickHandler();
    
};

export default todoFilter;
