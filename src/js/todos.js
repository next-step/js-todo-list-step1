const todoTitle = document.getElementById('new-todo-title');
const todoList = document.getElementById('todo-list');
const todoLocalData = localStorage.getItem('item');
const todoData = todoLocalData ? JSON.parse(todoLocalData) : [];

todoTitle.onkeydown = function(e){
    if (e.keyCode === 13) {
        const title = e.target.value.trim();
        if (title.length > 0) addItem(title);
        e.target.value = '';
    }
};

function getItem(){
    if(!todoData) return;
    todoData.map(data => {
        setItem(data.title);
    })
}
getItem();

function setItem(text){
    const title = document.createTextNode(text);
    const item = document.createElement('li');
    const view = document.createElement('div');
    view.className = 'view';

    const completedCheck = document.createElement('input');
    completedCheck.type = 'checkbox';
    completedCheck.className = 'toggle';

    const titleLabel = document.createElement('label');
    titleLabel.className = "label";

    const deleteButton = document.createElement('button');
    deleteButton.className = 'destroy';

    const editInput = document.createElement('input');
    editInput.className = 'edit';
    editInput.value = text;

    titleLabel.appendChild(title);
    view.appendChild(completedCheck);
    view.appendChild(titleLabel);
    view.appendChild(deleteButton);
    item.appendChild(view);
    item.appendChild(editInput);
    todoList.appendChild(item);

    completedCheck.addEventListener('click', (e) => {
        item.classList.toggle('completed');
    });
}

function addItem(text){
    setItem(text);
    todoData.push({completed: false, title: text});
    console.log('todoData',todoData);
    localStorage.setItem('item', JSON.stringify(todoData));

    // item.innerHTML = `
    //     <div class="view">
    //         <input class="toggle" type="checkbox"/>
    //         <label class="label">${title}</label>
    //         <button class="destroy"></button>
    //     </div>
    //     <input class="edit" value="${title}" />
    // `
    // const completedCheck = item.querySelector('.toggle');
}

function deleteItem(){

}

// function checkItem(check){
//     const parentLi = check.closest('li');
//     parentLi.classList.add('completed');
// }
