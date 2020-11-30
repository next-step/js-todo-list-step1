const store = {
    filtered: 'all',
    list : []
}

// target element
const userInputArea = document.getElementById('new-todo-title');
const toDoUlElement = document.getElementById('todo-list');
const toDoCount = document.querySelector('.todo-count').getElementsByTagName('strong')[0];
const filterUlElement = document.getElementsByClassName('filters')[0]

// event listner
userInputArea.addEventListener('keydown', function(e) {
   if(e.key === 'Enter' ) {
       if (e.target.value.replace(/\s| /gi, "").length ===0) {
        clearInput(e);   
        return
       }
        createToDoItem(e.target.value);
        clearInput(e);
   }
});
toDoUlElement.addEventListener('click', function(e) {
    const type = e.target.type;
    if (type === 'checkbox') {
        if (e.target.checked) {
            e.target.closest('li').classList.add('completed');
            store.list.map(value => {if (value.id === Number(e.target.closest('li').id)) {value.status = 'completed';}});
        } else {
            e.target.closest('li').classList.remove('completed');
            store.list.map(value => {if (value.id === Number(e.target.closest('li').id)) {value.status = '';}});
        }
        showSelected(store.filtered);
    } else if (type === 'submit') {
        this.removeChild(e.target.closest('li'));
        store.list.map((value, idx) =>{
            if (value.id === Number(e.target.closest('li').id)) {
                store.list.splice(idx, 1);
            }
        });
    }
    localStorage.setItem('list', JSON.stringify(store.list));
    renewalCount(store.filtered);
});
toDoUlElement.addEventListener('dblclick', function(e) {
    if (e.target.tagName === 'LABEL') {
        e.target.closest('li').classList.add('editing');
        e.target.closest('li').querySelector('.edit').value = e.target.innerText;
    }
});
toDoUlElement.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (e.target.value.replace(/\s| /gi, "").length ===0) {
        clearInput(e);   
        return
       }
        e.target.closest('li').classList.remove('editing');
        e.target.closest('li').querySelector('label').innerHTML = e.target.value;
        store.list.map(value => {if (value.id === Number(e.target.closest('li').id)) {value.value = e.target.value;}});
        localStorage.setItem('list', JSON.stringify(store.list));
    } else if (e.key === 'Escape') {
        e.target.closest('li').classList.remove('editing');
    }
});
filterUlElement.addEventListener('click', function(e) {
    const ul = e.target.closest('ul').children;
    for(let i = 0; ul.length > i; i++) {
        ul[i].children[0].classList.remove('selected');
    }
    e.target.classList.add('selected');
    if (e.target.classList.value.includes('active')) {
        showSelected('active');
        store.filtered = 'active';
    } else if (e.target.classList.value.includes('completed')) {
        showSelected('completed');
        store.filtered = 'completed';
    } else if (e.target.classList.value.includes('all')) {
        showSelected('all');
        store.filtered = 'all';
    }
});

// view
const toDoListLi = ({id ,value, status}) => {
        const liElement = document.createElement('li');
        const divElement = document.createElement('div');
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');
        const buttonElement = document.createElement('button');
        const editInputElement = document.createElement('input');

        if (status === 'completed') {
            liElement.setAttribute('class', status);
            inputElement.setAttribute('checked', 'checked');
        } else if (status === 'hidden') {
            liElement.setAttribute('class', status);
        }
        divElement.setAttribute('class', 'view');
        inputElement.setAttribute('class', 'toggle');
        inputElement.setAttribute('type', 'checkbox');
        labelElement.setAttribute('class', 'label');
        buttonElement.setAttribute('class', 'destroy');
        editInputElement.setAttribute('class', 'edit');
        liElement.setAttribute('id', id);

        divElement.appendChild(inputElement);
        divElement.appendChild(labelElement);
        divElement.appendChild(buttonElement);
        liElement.appendChild(divElement);
        liElement.appendChild(editInputElement);

        labelElement.innerHTML = value;
        return liElement;
}

// methods
const createToDoItem = (value) => {
    let status = '';
    const filterChildren = filterUlElement.children[2].children[0].className;
    if (filterChildren.indexOf('selected') !== -1) {status = 'hidden'}
    const id = +new Date();
    toDoUlElement.appendChild(toDoListLi({id, value, status}));
    store.list.push({id, status: '', value});
    localStorage.setItem('list', JSON.stringify(store.list));
    renewalCount(store.filtered);
}

const clearInput = (e) => {
    e.target.value = '';
}
const renewalCount = (param) => {
    if (param === 'all') {
        toDoCount.innerText = store.list.length;
    } else if (param === 'completed') {
        toDoCount.innerText = store.list.filter(value => {return value.status === param}).length;
    } else if (param === 'active'){
        toDoCount.innerText = store.list.filter(value => {return value.status !== 'completed'}).length;
    }
    
}
const showSelected = (param) => {
    const toDoItems = toDoUlElement.children;
    if (param === 'completed') {
        for (let i = 0; toDoItems.length > i; i++) {
            if (toDoItems[i].className.includes(param)) {
                toDoItems[i].classList.remove('hidden');
            } else {
            toDoItems[i].classList.add('hidden');
            }
        }
        renewalCount('completed');
    } else if (param === 'active') {
        for (let i = 0; toDoUlElement.children.length > i; i++) {
        if (toDoItems[i].className.includes('completed')) {
            toDoItems[i].classList.add('hidden');
            } else {
            toDoItems[i].classList.remove('hidden');
            }
        }
        renewalCount('active');
    } else {
        for (let i = 0; toDoItems.length > i; i++) {
            toDoItems[i].classList.remove('hidden');
        }
        renewalCount('all');
    }
}


window.onload = () => {
    const list  = localStorage.getItem('list');
    if (list === null) {return}
    const listArr = JSON.parse(list);
    if (listArr.length> 0) {
        for (let i = 0; listArr.length > i; i++) {
            store.list.push(listArr[i]);
            toDoUlElement.appendChild(toDoListLi({id: listArr[i].id, value : listArr[i].value, status : listArr[i].status}));
        }
    }
    renewalCount('all')
}