let count = 0;

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
        // store에 값 저장하기
        e.target.closest('li').classList.toggle('completed')
    } else if (type === 'submit') {
        // store에 값 삭제하기
        this.removeChild(e.target.closest('li'));
        count -= 1;
        renewalCount();
    }
});
toDoUlElement.addEventListener('dblclick', function(e) {
    if (e.target.tagName === 'LABEL') {
        e.target.closest('li').classList.add('editing');
        e.target.closest('li').querySelector('.edit').value = e.target.innerText;
    }
});
toDoUlElement.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        // 값을 저장하기
        e.target.closest('li').classList.remove('editing');
        e.target.closest('li').querySelector('label').innerHTML = e.target.value;
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
        showSelected('active')
    } else if (e.target.classList.value.includes('completed')) {
        showSelected('completed')
    } else if (e.target.classList.value.includes('all')) {
        showSelected('all')
    }
});

// view
const toDoListLi = ({value, addClass}) => {
        const liElement = document.createElement('li');
        const divElement = document.createElement('div');
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');
        const buttonElement = document.createElement('button');
        const editInputElement = document.createElement('input');

        if (addClass !== '') {
            liElement.setAttribute('class', addClass);
        }
        divElement.setAttribute('class', 'view');
        inputElement.setAttribute('class', 'toggle');
        inputElement.setAttribute('type', 'checkbox');
        labelElement.setAttribute('class', 'label');
        buttonElement.setAttribute('class', 'destroy');
        editInputElement.setAttribute('class', 'edit');

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
    let addClass = '';
    const filterChildren = filterUlElement.children[2].children[0].className;
    if (filterChildren.indexOf('selected') !== -1) {addClass = 'hidden'}
    toDoUlElement.appendChild(toDoListLi({value, addClass}));
    count += 1;
    renewalCount();
}

const clearInput = (e) => {
    e.target.value = '';
}
const renewalCount = (param) => {
    toDoCount.innerText = param;
}
const showSelected = (param) => {
    const toDoItems = toDoUlElement.children;
    let selectedCount = 0;
    if (param === 'completed') {
        for (let i = 0; toDoItems.length > i; i++) {
            if (toDoItems[i].className.includes(param)) {
                toDoItems[i].classList.remove('hidden');
                console.log(i, '완료된 것')
                selectedCount += 1;
            } else {
            toDoItems[i].classList.add('hidden');
            }
            renewalCount(selectedCount);
        }
    } else if (param === 'active') {
        for (let i = 0; toDoUlElement.children.length > i; i++) {
        if (toDoItems[i].className.includes('completed')) {
            toDoItems[i].classList.add('hidden');
            } else {
            toDoItems[i].classList.remove('hidden');
            selectedCount += 1;
            }
        }
        renewalCount(selectedCount);
    } else {
        for (let i = 0; toDoItems.length > i; i++) {
            toDoItems[i].classList.remove('hidden');
        }
        renewalCount(count);
    }
}

