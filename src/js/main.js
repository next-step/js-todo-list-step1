const $todoApp = document.querySelector('.todoapp');
const $inputTodo = document.querySelector('#new-todo-title');
const $todoList = document.querySelector('#todo-list');
const $todoLists = document.querySelectorAll('li');
const $todoCount = document.querySelector('.todo-count').childNodes[1];
const $showAll = document.querySelector('.all');
const $showActive = document.querySelector('.active');
const $showCompleted = document.querySelector('.completed');

const eventInit =()=> {

    $inputTodo.addEventListener('keypress', addTodo);
    $showAll.addEventListener('click', showAll);
    $showActive.addEventListener('click', showActive);
    $showCompleted.addEventListener('click', showCompleted);
}

const addTodo = (e) => {
    if (e.key === 'Enter') {
        todos.push({
            text: e.target.value,
            complete: false
        });

        AddElement(e.target.value, false);
        $inputTodo.value = '';

        setLocalStorage();
        $todoCount.innerText = todos.length;
    }
}

const showAll= () => {
    Array.from($todoList.children).forEach(li => li.remove());
    $todoApp.querySelectorAll('.selected').forEach(a => a.classList.remove('selected'))
    $showAll.classList.toggle('selected');
    todos.forEach(todo => {
        AddElement(todo.text, todo.complete)
    });
    $todoCount.innerText=todos.length;
}

const showActive = ()=> {
    Array.from($todoList.children).forEach(li => li.remove());
    $todoApp.querySelectorAll('.selected').forEach(a => a.classList.remove('selected'))
    $showActive.classList.toggle('selected');
    let count=0;
    todos.forEach(todo => {
        if(!todo.complete){
            AddElement(todo.text, todo.complete)
            count++;
        }
    });
    $todoCount.innerText=count;
}

const showCompleted = () => {
    Array.from($todoList.children).forEach(li => li.remove());
    $todoApp.querySelectorAll('.selected').forEach(a => a.classList.remove('selected'))
    $showCompleted.classList.toggle('selected');
    let count=0;
    todos.forEach(todo => {
        if(todo.complete){
            AddElement(todo.text, todo.complete)
            count++;
        }
    });
    $todoCount.innerText=count;
}

let todos=[];
const setTodoListFromLocalStorage = () => {
    let localTodos=localStorage.getItem('todos');
    if(localStorage){
        todos=JSON.parse(localTodos);
    }
    
    todos.forEach(todo => {
        AddElement(todo.text, todo.complete)
    });
    $todoCount.innerText=todos.length;
}

const AddElement = (text, complete) => {
    let li = document.createElement('li');
    let div = document.createElement('div');
    if(complete) {
        li.classList.add('completed')        
    }
    div.classList.add('view');
    
    let input = document.createElement('input');
    input.classList.add('toggle');
    input.type = 'checkbox';
    input.checked = complete;
    input.addEventListener('change', checkboxChange);

    let label = document.createElement('label');
    label.innerText = text;
    label.addEventListener('dblclick', edit);

    let button = document.createElement('button');
    button.classList.add('destroy');
    button.addEventListener('click', destroy);

    let inputEdit = document.createElement('input');
    inputEdit.classList.add('edit');
    inputEdit.value = text;
    inputEdit.addEventListener('keydown', editComplete);

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(button);
    li.appendChild(div);
    li.appendChild(inputEdit);
    $todoList.appendChild(li);
}

const editComplete = (e) => {
    if(e.key==='Enter'){
        let newText = e.target.value;
        let label = e.target.previousSibling.querySelector('label');
        let oldText = label.innerText;
        label.innerText = newText;
        e.target.parentNode.classList.toggle('editing');
        todos = todos.map(todo => {
            let txt = todo.text;
            if(todo.text === oldText) todo.text = newText;
            return {text: todo.text, complete: todo.complete}
        });
        setLocalStorage();
    }
    if(e.key==='Escape'){
        let oldText = e.target.previousSibling.querySelector('label').innerText;
        e.target.value=oldText;
        e.target.parentNode.classList.toggle('editing')
    }
}

const edit = (e) => {
    console.log(e)
    e.target.parentNode.parentNode.classList.toggle('editing')
}

const destroy = (e) => {
    e.target.parentNode.parentNode.remove();

    todos = todos.filter(todo => {
        return todo.text !== e.target.previousSibling.innerText;
    });
    setLocalStorage();
    $todoCount.innerText = todos.length;
}

const checkboxChange = (e) => {
    if (e.target.checked)
        e.target.removeAttribute('checked');
    e.target.parentNode.parentNode.classList.toggle('completed');
    todos = todos.map(todo => {
        if (todo.text === e.target.nextSibling.innerText) {
            return { text: todo.text, complete: e.target.checked };
        }
        return { text: todo.text, complete: todo.complete };
    });
    setLocalStorage();
}

const setLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}


setTodoListFromLocalStorage();
eventInit();
