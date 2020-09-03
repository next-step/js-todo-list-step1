/* 1. todo list에 todoItem을 키보드로 입력하여 추가하기 */ 
function addItem() {
    //  enter키 동작 시 inputText 받아오기

    const make = todoItem =>{
        const frame = `<li>
                        <div class="view">
                          <input class="toggle" type="checkbox" ${todoItem.checked ? 'checked': ''}>
                          <label class="label">${todoItem.text}</label>
                          <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${todoItem.text}" />
                      </li>`;
        let $div = document.createElement('div');
        $div.innerHTML = frame;
        return $div.firstElementChild;
    }
    let $todoInput = document.getElementById('new-todo-title');
    const todoText = $todoInput.value;

    // todo-list 추가
    let $ul = document.getElementById('todo-list');
    $ul.append(make({text:todoText, checked: false}));
    $todoInput.value = '';
}




window.addEventListener("DOMContentLoaded", ()=>{


});
