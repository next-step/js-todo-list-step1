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
        createToDoItem(e);
        clearInput(e);
   }
});
toDoUlElement.addEventListener('click', function(e) {
    const type = e.target.type;
    const $closestLi = e.target.closest('li');
    const list = store.list;
    if (type === 'checkbox') {
        if (e.target.checked) {
            $closestLi.classList.add('completed');
            list.map(value => {if (value.id === Number($closestLi.id)) {value.status = 'completed';}});
        } else {
            $closestLi.classList.remove('completed');
            list.map(value => {if (value.id === Number($closestLi.id)) {value.status = '';}});
        }
        showSelected(store.filtered);
    } else if (type === 'submit') {
        this.removeChild($closestLi);
        list.map((value, idx) =>{
            if (value.id === Number($closestLi.id)) {
                list.splice(idx, 1);
            }
        });
    }
    setLocalStorage('list', list);
    renewalCount(store.filtered);
});
toDoUlElement.addEventListener('dblclick', function(e) {
    const $closestLi = e.target.closest('li');
    if (e.target.tagName === 'LABEL') {
        $closestLi.classList.add('editing');
        $closestLi.querySelector('.edit').value = e.target.innerText;
    }
});
toDoUlElement.addEventListener('keydown', function(e) {
    const $closestLi = e.target.closest('li');
    if (e.key === 'Enter') {
        if (e.target.value.replace(/\s| /gi, "").length ===0) {
        clearInput(e);   
        return
       }
        $closestLi.classList.remove('editing');
        $closestLi.querySelector('label').innerHTML = e.target.value;
        store.list.map(value => {if (value.id === Number($closestLi.id)) {value.value = e.target.value;}});
        setLocalStorage('list', store.list);
    } else if (e.key === 'Escape') {
        $closestLi.classList.remove('editing');
    }
});
filterUlElement.addEventListener('click', function(e) {
    const ul = e.target.closest('ul').children;
    const $classList = e.target.classList;
    for(let i = 0; ul.length > i; i++) {
        ul[i].children[0].classList.remove('selected');
    }
    $classList.add('selected');
    if ($classList.value.includes('active')) {
        showSelected('active');
        store.filtered = 'active';
    } else if ($classList.value.includes('completed')) {
        showSelected('completed');
        store.filtered = 'completed';
    } else if ($classList.value.includes('all')) {
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
const createToDoItem = (e) => {
    if (e.target.value.replace(/\s| /gi, "").length ===0) {
        clearInput(e);   
        return
    }
    let status = '';
    const filterChildren = filterUlElement.children[2].children[0].className;
    if (filterChildren.indexOf('selected') !== -1) {status = 'hidden'}
    const id = +new Date();
    toDoUlElement.appendChild(toDoListLi({id, value: e.target.value, status}));
    store.list.push({id, status: '', value: e.target.value});
    setLocalStorage('list', store.list);
    renewalCount(store.filtered);
}
const clearInput = (e) => {
    e.target.value = '';
}
const setLocalStorage = (to, what) => {
    return localStorage.setItem(to, JSON.stringify(what));
};
const getLocalStorage = (from) => {
    return JSON.parse(localStorage.getItem(from));
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
    } else if (param === 'active') {
        for (let i = 0; toDoUlElement.children.length > i; i++) {
        if (toDoItems[i].className.includes('completed')) {
            toDoItems[i].classList.add('hidden');
            } else {
            toDoItems[i].classList.remove('hidden');
            }
        }
    } else if (param === 'all') {
        for (let i = 0; toDoItems.length > i; i++) {
            toDoItems[i].classList.remove('hidden');
        }
    }
    renewalCount(param);
}


const init = () => {
    const list  = getLocalStorage('list');
    if (list === null) {return}
    if (list.length> 0) {
        for (let i = 0; list.length > i; i++) {
            store.list.push(list[i]);
            toDoUlElement.appendChild(toDoListLi({id: list[i].id, value : list[i].value, status : list[i].status}));
        }
    }
    renewalCount('all');
};

init();