const $list = document.querySelector('#todo-list');
const $newTodoTitle  = document.querySelector('#new-todo-title');
let id = 0;

/**
 * 투두 저장소
 */
const Todos = () => {
    let todos = [
        { id: 1, title: "투두리스트 만들기", done: false},
    ];
    return {
        selectAll(){
            return [...todos];
        },
        deleteAll(){
            return todos = [];
        },
        insertOne(todo = {}){
            if(todo){
                todos.push(todo);
                return true;
            } 
            return false;
        },
        deleteOne(id = ''){
            if(id){
                const index = todos.findIndex(todo => todo.id === id);
                (index > -1) && todos.splice(index, 1);
                return true;
            }
            return false;
        },
        updateOne(){
            
        },
        selectCount(){
            return todos.length;
        }
    }
}

const todosStore = Todos(); 

/**
 * 투두 추가 함수
 * @param {*} todo 
 */
const addTodo = (todo = {}) => {
    if(!todo){
        return;
    }
    const todoInHTML = `<li id=${todo.id} class="todoItem">
                            <div class="view>
                                <input class="toggle" type="checkbox" />
                                <label class="lable">${todo.title}</label>
                                <button class="destory"></button>
                            </div>
                            <input class="edit" value=${todo.title} />
                        </li>`

    $list.insertAdjacentHTML('beforeend', todoInHTML);
}


/**
 * 투두 리스트 페이지 첫 진입 시 
 */
const init = () => {
    const initTodoList = () => {
        const todos = todosStore.selectAll();
        todos.map(todo => addTodo(todo));
    }

    // todo : 로컬스토리지에서 저장된 데이터 가지고 오는 로직 
    
    initTodoList();
}

init();



/**
 * 투두 추가 이벤트 리스너
 */
$newTodoTitle.addEventListener('keyup', e => {
    // keyCode 가 deprecated?
    if(e.code === 'Enter'){
        const title = e.target.value;
        if(title){
            const todo = {
                id: id += 1,
                title,
                done: false,
            }
            todosStore.insertOne(todo) && addTodo(todo);
        }
        $newTodoTitle.value = "";
    }
})











