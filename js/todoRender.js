const todoTemplate = ({ id, contents, completed }) => {
    return `<li data-id=${id} class=${completed? 'completed':''}>
            <div class="view">
                <input class="toggle" type="checkbox" ${completed? 'checked' : ''}/>
                <label class="label">${contents}</label>
                <button class="destroy"></button>
            </div>
        <input class="edit" value='${contents}' />
    </li>`;
};

export const todoListRender = () => {
    const $todoList = document.querySelector('.todo-list');

    // 다시 고려해볼 것
    const $todoApp = document.querySelector(".todoapp");
    const $todoCount = $todoApp.querySelector(".todo-count > strong");

    let todoArr = [];
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let todoItem = JSON.parse(localStorage.getItem(key));
        todoItem.id = key;
        todoArr.push(todoItem);
        // console.log(todoItem.contents);
    }

    // todo list를 timestamp 대로 정렬
    todoArr.sort((a,b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
    });

    $todoList.innerHTML = todoArr.map((todo) => todoTemplate(todo)).join('');
    
    // 전체보기 말고 해야할 일, 완료한 일에서도 개수가 바뀌도록 수정해야함
    $todoCount.innerText = localStorage.length;
};