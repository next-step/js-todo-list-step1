import { $, hasClass, addClass, removeClass } from './util/index.js';
import Model from './Model.js';
import TodoList from './components/TodoList.js';

const initState = [
	{
		text: '1',
		isCompleted: true,
	},
	{
		text: '2',
		isCompleted: false,
	},
];

export default function App() {
	let model = Model({
		observable: {},
		renderer: () => {
			$('#todo-list').innerHTML = TodoList(model.todo);
			$('#new-todo-title').value = '';
			const [, hashHref] = window.location.hash.split('#/');
			const todoCount = hashHref ? getTodoCount()[hashHref] : model.todo.length;

			$('.todo-count > strong').innerHTML = todoCount;
		},
	});

	const getTodoCount = function () {
		const { activeCount, completedCount } = model.todo.reduce(
			({ activeCount, completedCount }, { isCompleted }) => {
				return {
					activeCount: !isCompleted ? activeCount + 1 : activeCount,
					completedCount: isCompleted ? completedCount + 1 : completedCount,
				};
			},
			{ activeCount: 0, completedCount: 0 },
		);

		return {
			active: activeCount,
			completed: completedCount,
		};
	};

	const removeEditMode = function ($li) {
		const isList = $li.length >= 2;

		if (isList) {
			$li.forEach((el) => removeClass(el, 'editing'));
		} else {
			removeClass($li, 'editing');
		}
	};

	const createTodo = function (e) {
		e.preventDefault();

		const isEnter = e.key === 'Enter';
		const { value: newTodo } = e.target;

		if (!isEnter || !newTodo) {
			return;
		}

		model.todo = [
			...model.todo,
			{
				text: newTodo,
				isCompleted: false,
			},
		];
	};

	const updateTodo = function (e) {
		if (e.target.className === 'label') {
			e.target.offsetParent.className = 'editing';
		}
	};

	const deleteTodo = function ({ target }) {
		const selectedTodoId = Number(target.offsetParent.dataset.todoId);

		if (target.className === 'destroy') {
			model.todo = model.todo.filter((item, index) => index !== selectedTodoId);
		}

		if (target.className === 'toggle') {
			const selectedTodo = model.todo[selectedTodoId];
			const newTodo = {
				...selectedTodo,
				isCompleted: !selectedTodo.isCompleted,
			};

			model.todo = [...model.todo.slice(0, selectedTodoId), newTodo, ...model.todo.slice(selectedTodoId + 1)];
		}
	};

	const onBeforeUnload = function (e) {
		e.preventDefault();

		const isEscape = e.key === 'Escape';
		const $editLi = $('li.editing');

		if (isEscape && $editLi) {
			removeEditMode($editLi);
		}
	};

	const onChangeFilter = function ({ target }) {
		const isAnchorNode = target.nodeName === 'A';

		if (!isAnchorNode || hasClass(target, 'selected')) {
			return;
		}

		removeClass($('a.selected'), 'selected');
		addClass(target, 'selected');

		const [, hashHref] = target.href.split('#/');
		const todoCount = hashHref ? getTodoCount()[hashHref] : model.todo.length;

		$('.todo-count > strong').innerHTML = todoCount;
	};

	return {
		init: function () {
			model.todo = initState;

			$('.new-todo').addEventListener('keyup', createTodo);
			$('#todo-list').addEventListener('dblclick', updateTodo);
			$('#todo-list').addEventListener('click', deleteTodo);
			$('ul.filters').addEventListener('click', onChangeFilter);
			$('body').addEventListener('keyup', onBeforeUnload);
		},
	};
}
