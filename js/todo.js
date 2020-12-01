const $list = document.querySelector('#todo-list');
const $newTodoTitle  = document.querySelector('#new-todo-title');
const $todoList = document.querySelector('#todo-list');
const $countContainer = document.querySelector('#count-container');
const $count = document.querySelector('#strong-count');

/**
 * 투두 더미 데이터
 */
let dummies = [
    { id: 1, title: "투두리스트 만들기", isDone: false},
    { id: 2, title: "코로나 종식시키기", isDone: false},
    { id: 3, title: "컴퓨터 구매하기", isDone: true},
]

/**
 * 전역 상태 관리
 */
const State = () => {
    let state = {};
    
    return {
        setState(obj){
            if(typeof obj === 'object'){
                Object.assign(state, obj);
                return true;
            }
            return false;
        },
        getState(){
            return copiedState = state;
        }
    }
}

const state = State();


/**
 * 투두 저장소
 */
const Todos = () => {
    // let todos = [];
    let todos = dummies;

    return {
        getFromLocalStorage(){
            // LocalStorage.get
        },
        setToLocalStorage(){
            // LocalStorage.set
        },
        selectAll(isDone){
            switch(isDone){
                case true:  return todos.filter(todo => todo.isDone === true); break;
                case false: return todos.filter(todo => todo.isDone !== true); break;
                default : return [...todos];
            }
        },
        deleteAll(){
            return todos = [];
        },
        insertOne(todo){
            if(todo){
                todos.push(todo);
                return true;
            } 
            return false;
        },
        removeOne(id){
            id = parseInt(id);
            if(id){
                const index = todos.findIndex(todo => todo.id === id);
                (index > -1) && todos.splice(index, 1);
                return true;
            }
            return false;
        },
        checkOne(id){
            id = parseInt(id);
            const todo = todos.find(todo => todo.id === id);
            if(todo){
                todo.isDone = !todo.isDone;
                return true;
            }
            return false;
        },
        editOne(id, title){
            id = parseInt(id);
            const todo = todos.find(todo => todo.id === id)
            if(todo){
                todo.title = title;
                return true
            }
            return false;
        }, 
        selectCount(){
            return todos.length;
        }
    }
}


/**
 * 투두 아이디 관리 generator
 */
const idGenerator = () => {
    let id = dummies.length

    return {
        getCurrentId() {
            return copiedId = id;
        },
        generateId() {
            return copiedId = ++id;
        }
    }
}

const todosStore = Todos(); 


/**
 * 렌더링 함수
 * @param {*} todo 
 */
const renderTodo = (todo) => {
    if(!todo){
        return;
    }
    const {id, isDone, title} = todo;
    
    const todoInHTML = `<li id=${id} class="todoItem ${isDone? 'completed' : ''}">
                            <div class="view">
                                <input class="toggle" type="checkbox" ${isDone? 'checked': ''}/>
                                <label class="label">${title}</label>
                                <button class="destroy"></button>
                            </div>
                            <input type="text" class="edit" value=${title+""} />
                        </li>`

    $list.insertAdjacentHTML('beforeend', todoInHTML);

    const count = todosStore.selectCount();
    count && renderCount(count);
}

/**
 * 갯수 렌더링 함수
 */
const renderCount = () => {
    $count.innerText = todosStore.selectCount();
}

/**
 * 투두 리스트 페이지 첫 진입 시 
 */
const init = () => {
    const initTodoList = () => {
        // todo : 로컬스토리지에서 저장된 데이터 가지고 오는 로직 
        // todosStore.getFromLocalStorage();

        state.setState( { 
            onEdit : false,
            filterType :  'all',
        });
        
        const todos = todosStore.selectAll();
        todos.map(todo => renderTodo(todo));

        renderCount();
    }

    initTodoList();
}

init();

/**
 * 첫번째 인자가 true 일때만 함수를 실행시켜 주는 헬퍼 함수
 * @param {*} isTrue 
 */
const executeWhenTrue = isTrue => fn => {
    if(isTrue){
        fn();
    }
}

/**
 * 투두 체크
 * @param {*} param0 
 * @param {*} targetElement 
 */
const checkTodo = ({id, classList}, targetElement) => {
    executeWhenTrue(todosStore.checkOne(id))(() => {
        classList.toggle('completed') &&
        !targetElement.checked ? 
        targetElement.removeAttribute('checked') : 
        targetElement.setAttribute('checked', '')
    })
}

/**
 * 투두 삭제
 * @param {*} baseElement 
 */
const removeTodo = (baseElement) => {
    executeWhenTrue(todosStore.removeOne(baseElement.id))(() => {baseElement.parentNode.removeChild(baseElement); renderCount()});
}


/**
 * 투두 갱신 
 * @param {*} baseElement 
 * @param {*} targetElement 
 */
const editTodo = (baseElement, targetElement) => {
    const {id, classList} = baseElement;
    const inputField = baseElement.querySelector('input.edit');
    classList.toggle('editing');    

    const escape = () => {
        classList.contains('editing') && classList.remove('editing');
    }

    inputField.select();
    
    inputField.addEventListener('keyup', e => {
        if(e.code === 'Enter'){
            const title = e.target.value;
            if(title){
                executeWhenTrue(todosStore.editOne(id, title))(() => {
                    targetElement.innerText = title;
                    baseElement.querySelector('input.edit').value = title;
                    escape();
                });
                state.setState({ onEdit:false });
            }
        }else if(e.code === 'Escape'){
            escape();
            state.setState({ onEdit:false });
        }
    })

    inputField.addEventListener('focusout', e => {
        escape();
        state.setState({ onEdit:false });
    })
}


/**
 * 투두 추가 이벤트 리스너
 */
$newTodoTitle.addEventListener('keyup', e => {
    // keyCode 가 deprecated?
    if(e.code === 'Enter'){
        const title = e.target.value;
        if(title){
            const todo = {
                id : idGenerator().generateId(),
                title,
                isDone : false,
            }
            executeWhenTrue(todosStore.insertOne(todo))(() => {renderTodo(todo); renderCount()});
        }
        $newTodoTitle.value = "";
    }
})


/**
 * 투두 클릭 이벤트 리스너
 */
$list.addEventListener("click", e => {
    const targetElement = e.target;
    const className = targetElement.classList.value;
    const baseElement = targetElement.closest('li.todoItem');

    if(className === 'toggle'){
        checkTodo(baseElement, targetElement);
    }else if(className === 'destroy'){
        removeTodo(baseElement);
    }else{
        return;
    }
})


/**
 * 투두 더블클릭 이벤트 리스너
 */
$list.addEventListener("dblclick", e => {
    if(state.getState().onEdit){
        return;
    }
    const targetElement = e.target;
    const className = targetElement.classList.value;
    const baseElement = targetElement.closest('li.todoItem');

    if(className === 'label'){
        editTodo(baseElement, targetElement);
        state.setState({onEdit:true});
        // setTimeout(() => targetElement.focus(), 0);
    }
})


const filterTodo = (filterType) => {
    
}








