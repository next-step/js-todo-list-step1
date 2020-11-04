const $app = document.querySelector('#app');

const FilterTypes = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
}

let state = JSON.parse(localStorage.getItem('state')) || {
    todoItems: [],
    editing: -1,
    filterType: FilterTypes.ALL
}

const todoTemplate = ({ todoItems, editing, filterType }) => `
    <h1>TODOS</h1>
    <input
        id="new-todo-title"
        class="new-todo"
        placeholder="할일을 추가해주세요"
        autofocus
    />
    <main>
        <input class="toggle-all" type="checkbox" />
        <ul id="todo-list" class="todo-list">
            ${todoItems.map(({ contents, completed }, key) => 
                (filterType === FilterTypes.ACTIVE && !completed) ||
                (filterType === FilterTypes.COMPLETED && completed) ||
                filterType === FilterTypes.ALL ? `
                <li class="${
                    editing === key ? 'editing'   :
                    completed       ? 'completed' : ''
                }" data-index="${key}">
                    <div class="view">
                    <input class="toggle" type="checkbox" ${completed ? 'checked' : ''} />
                    <label class="label">${contents}</label>
                    <button class="destroy"></button>
                    </div>
                    <input class="edit" value="${contents}" />
                </li>
            `:'').join('')}
        </ul>
        <div class="count-container">
            <span class="todo-count">총 <strong>${todoItems.length}</strong> 개</span>
            <ul class="filters">
                <li>
                    <a data-filter-type="${FilterTypes.ALL}"
                    class="${FilterTypes.ALL === filterType ? 'selected' : '' } ${FilterTypes.ALL}"
                    href="#">
                    전체보기
                    </a>
                </li>
                <li>
                    <a data-filter-type="${FilterTypes.ACTIVE}"
                    class="${FilterTypes.ACTIVE === filterType ? 'selected' : '' } ${FilterTypes.ACTIVE}"
                    href="#active">
                    해야할 일
                    </a>
                </li>
                <li>
                    <a data-filter-type="${FilterTypes.COMPLETED}"
                    class="${FilterTypes.COMPLETED === filterType ? 'selected' : '' } ${FilterTypes.COMPLETED}"
                    href="#completed">
                    완료한 일
                    </a>
                </li>
            </ul>
        </div>
    </main>
`;

const render = () => {
    $app.innerHTML = todoTemplate(state);

    $app.querySelector('#new-todo-title').addEventListener('keyup', ({ target, key }) => {
        if (key !== 'Enter') return;
        setState({
            todoItems: [
                ...state.todoItems,
                {
                    contents: target.value,
                    completed: false
                }
            ]
        })
    });

    $app.querySelectorAll('.toggle').forEach(v =>
        v.addEventListener('change', ({ target }) => {
            const { todoItems } = state;
            const index = target.closest('[data-index]').dataset.index;
            todoItems[index].completed = !todoItems[index].completed;
            setState({ todoItems });
        })
    );

    $app.querySelectorAll('.destroy').forEach(v =>
        v.addEventListener('click', ({ target }) => {
            const { todoItems } = state;
            const index = target.closest('[data-index]').dataset.index;
            todoItems.splice(index, 1);
            setState({ todoItems });
        })
    );

    $app.querySelectorAll('.label').forEach(v =>
        v.addEventListener('dblclick', ({ target }) => {
            const editing = Number(target.closest('[data-index]').dataset.index);
            setState({ editing });
        })
    );

    $app.querySelector('.editing .edit')?.addEventListener('keyup', ({ target, key }) => {
        if (!['Escape', 'Enter'].includes(key)) return;
        const { todoItems } = state;
        const index = target.closest('[data-index]').dataset.index;
        if (key === 'Enter') {
            todoItems[index].contents = target.value;
        }
        setState({ todoItems, editing: -1 });

    });

    $app.querySelectorAll('.filters a').forEach(v =>
        v.addEventListener('click', ({ target }) => {
            setState({ filterType: target.dataset.filterType });
        })
    );
}
render();

const setState = (newState) => {
    state = { ...state, ...newState };
    localStorage.setItem('state', JSON.stringify(state));
    render();
}
