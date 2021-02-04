import { newGuid } from './utils.js';

const $todoInput = document.querySelector("#new-todo-title");
const $todoList = document.querySelector("#todo-list");

const $todoApp = document.querySelector(".todoapp");
const $todoCount = $todoApp.querySelector(".todo-count > strong");

const $viewAllList = $todoApp.querySelector('.all'); // '전체보기' 버튼
const $viewTodoList = $todoApp.querySelector('.active'); //'해야할 일' 버튼
const $viewDoneList = $todoApp.querySelector('ul.filters').querySelector('.completed'); //'완료한 일' 버튼

todoListRender();
$todoCount.innerText = localStorage.length;

function todoListRender() {
    let todoArr = [];
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let todoItem = JSON.parse(localStorage.getItem(key));
        todoItem.id = key;
        todoArr.push(todoItem);
    }

    // todo list를 timestamp 대로 정렬
    todoArr.sort((a,b) => {
        const c = new Date(a.timestamp);
        const d = new Date(b.timestamp);
        return c-d;
    });

    $todoList.innerHTML = todoArr.map(({ id, contents, completed}) => (
        `
          <li data-id=${id} class=${completed? 'completed':''}>
              <div class="view">
                  <input class="toggle" type="checkbox" ${completed? 'checked' : ''}/>
                  <label class="label">${contents}</label>
                  <button class="destroy"></button>
                  </div>
            <input class="edit" value=${contents} />
          </li>
        `)
      ).join('');

    $todoCount.innerText = localStorage.length;
}

const addTodo = ({ target, key }) => {
    const contents = target.value;
    
    if (key !== "Enter" || !contents.trim()) return;
    
    const id = newGuid(); 
    const completed = false;
    const timestamp = new Date();

    const todoItem = { contents: contents, completed: completed, timestamp: timestamp };
    localStorage.setItem(id, JSON.stringify(todoItem));

    target.value = '';
    todoListRender();
};

const checkTodo = ({ target }) => {
    if (target.className !== 'toggle') return;
    
    const $li = target.closest('li');
    const { id } = $li.dataset;

    const localVal = JSON.parse(localStorage.getItem(id));
    localVal.completed  = localVal.completed? false : true;
    localStorage.setItem(id, JSON.stringify(localVal));

    $li.classList.toggle('completed');
};

const deleteTodo = ({ target }) => {
    if(target.className !== 'destroy') return;

    if(!confirm('정말로 삭제하시겠습니까?')) return;
    
    const $li = target.closest('li');
    const { id } = $li.dataset;

    localStorage.removeItem(id);

    todoListRender();
};

const editTodo = ({ target }) => {
    if(target.className !== 'label') return;
    
    cancelEditMode(); // ❌
    
    const $li = target.closest('li');
    $li.classList.toggle('editing');
    const $childLabel = $li.querySelector('.edit');
    $childLabel.focus();
};

const onEdited = ({ target, key }) => {
    if(key === 'Escape'){
        cancelEditMode();
        target.value = target.closest('li').querySelector('label').textContent; 
        return;
    }
    if(key === 'Enter'){
        const contents = target.value;
        if(!contents.trim()){
            alert('내용을 입력해주세요.');
            return;
        }
        const $li = target.closest('li');
        const { id } = $li.dataset;

        const localVal = JSON.parse(localStorage.getItem(id));
        localVal.contents = contents;
        localStorage.setItem(id, JSON.stringify(localVal));

        todoListRender(); // ⭐
    }
};

// '전체보기' 버튼을 눌렀을 때
const viewAll = () => {
    $viewAllList.classList.add('selected');
    $viewTodoList.classList.remove('selected');
    $viewDoneList.classList.remove('selected');
    todoListRender(); // ⭐
};

// '해야할 일' 버튼을 눌렀을 때
const viewTodo = () => {
    $viewTodoList.classList.add('selected');
    $viewAllList.classList.remove('selected');
    $viewDoneList.classList.remove('selected');
    
    $todoList.querySelectorAll('li').forEach($item =>{
        $item.style.display = $item.classList.contains('completed')? 'none' : 'block';
    });

    $todoCount.innerText = localStorage.length - $todoList.querySelectorAll('li.completed').length;
};

// '완료한 일' 버튼을 눌렀을 때
const viewDone = () => {
    $viewDoneList.classList.add('selected');
    $viewTodoList.classList.remove('selected');
    $viewAllList.classList.remove('selected');
    
    $todoList.querySelectorAll('li').forEach($item =>{
        $item.style.display = $item.classList.contains('completed')? 'block' : 'none';
    });

    $todoCount.innerText = $todoList.querySelectorAll('li.completed').length;
};

function cancelEditMode(){
    const $item = $todoList.querySelector('li.editing');
    if(!$item) return;
    $item.classList.toggle('editing');
}

$todoInput.addEventListener('keyup', addTodo); // todo list 추가
$todoList.addEventListener('click', checkTodo); // todo list 체크
$todoList.addEventListener('click', deleteTodo); // todo list 삭제
$todoList.addEventListener('dblclick', editTodo); // 수정 모드
$todoList.addEventListener('keyup', onEdited);

$viewAllList.addEventListener('click', viewAll); // '전체보기'
$viewTodoList.addEventListener('click', viewTodo); // '해야할 일'
$viewDoneList.addEventListener('click', viewDone); // '완료한 일'
