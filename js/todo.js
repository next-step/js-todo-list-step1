
/**
 *  투두 리스트 컨테이너
 * @param {*} data 
 * @param {*} elementId 
 */
const TodoList = (data) => {
    let todos = data;
    let filter = 'all';

    const setLocalStorage = () => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    };

    const render = () => {

        let filteredTodo = [...todos];
        if ( filter === 'active' ) {
            filteredTodo = todos.filter(todo => !todo.isDone);
        }else if (filter === 'completed') {
            filteredTodo = todos.filter(todo => todo.isDone)
        }

        document.querySelector('#todo-list').innerHTML =
        filteredTodo.map(todo => Todo(todo)).join('\n'); 
        document.querySelector('.todo-count>strong').innerHTML = 
        filteredTodo.length;
    }


    /* todo 수정 */
    addEvent('#todo-list', 'dblclick', e => {
        const { target } = e;
        if(target.classList.contains('label') && target.nodeName === "LABEL"){
            const $li = target.closest("li");
            if(!$li.classList.contains('completed')){
                $li.classList.add("editing");
                const $input = $li.querySelector('input.edit');
                const escape = () => {
                    $li.classList.contains('editing') && $li.classList.remove('editing');
                }
                $input.select();
                $input.addEventListener('focusout', () => escape());
                $input.addEventListener('keyup', e => {
                    if(e.code === 'Enter'){
                        todos.find(todo => todo.id == $li.id).title = e.target.value || "";
                        target.value = title;
                        escape();
                    }else if(e.code === 'Escape'){
                        escape();
                    }
                })
            }
        }
    })

    /* todo 체크 | todo 삭제 */
    addEvent('#todo-list', 'click', e => {
        const { target } = e;
        if(target.classList.contains('toggle') && target.nodeName === "INPUT"){
            const $li = target.closest("li");
            if(target.checked){
                $li.classList.add('completed');
                todos.find(todo => todo.id == $li.id).isDone = true;
            }else{
                $li.classList.remove('completed');
                todos.find(todo => todo.id == $li.id).isDone = false;                
            }   
            setLocalStorage();
        }else if(target.classList.contains('destroy') && target.nodeName === "BUTTON"){
            const $li = target.closest("li");
            const index = todos.findIndex(todo => todo.id == $li.id);
            (index > -1) && todos.splice(index, 1);
            render();
            setLocalStorage();
        }
    });

    return {
        render,
        setLocalStorage,
        addTodo(data) {
            todos = [...todos,...data];
            this.render();
            this.setLocalStorage();
        },
        setFilter(param){
            filter = param;
        },
        getFilter(){
            return filter;
        },
        getTodosLength(){
            return todos.length;
        }
    }
}


/**
 * 투두 컴포넌트
 * @param {*} param0 
 */
const Todo = ({id, title, isDone}) => {
    return todoInHTML = 
        `<li id=${id} class="todoItem ${isDone? 'completed' : ''}">
            <div class="view">
                <input class="toggle" type="checkbox" ${isDone? 'checked': ''}/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value=${title} />
        </li>`;
}


/**
 * 이벤트 추가 함수
 * @param {*} elementId 
 * @param {*} action 
 * @param {*} fn 
 */
const addEvent = (elementId, action, fn) => {
    document.querySelector(elementId).addEventListener(action, fn);
}


/**
 * 시작 함수
 */
const init = () => {
    const savedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];

    const todoList = TodoList(savedTodoList);
    todoList.render();

    const idGenerator = () => {
        let id = todoList.getTodosLength();
        return { 
            generateId() {
                return ++id;
            }
        }
    } 

    const idGen = idGenerator();

    /* todo 등록 */
    addEvent('#new-todo-title', 'keyup', e => {
        if(e.code === 'Enter'){
            const title = e.target.value.trim();
            if(title){
                const todo = {
                    id : idGen.generateId(),
                    title,
                    isDone : false,
                }
                todoList.addTodo([
                    todo,
                ])
            }
            e.target.value = "";
        }
    });

    /* 투두 리스트 필터 */
    addEvent('.filters', 'click', e => {
        const { target } = e;
        if(target.nodeName === 'A'){
            const className = target.classList[0];
            const filter = todoList.getFilter()
            if(className === filter){
                return false;
            }else{
                target.closest("ul").querySelector('.' + filter).classList.remove('selected');
                target.classList.add('selected');
                todoList.setFilter(className);
                todoList.render();
            }
        }
    })
}

init();










