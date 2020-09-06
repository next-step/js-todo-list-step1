const $inputTodoNewTitle = document.querySelector('#new-todo-title');
const $ulTodoList = document.querySelector('#todo-list');
const $spanTodoCounter = document.querySelector('.todo-count');
const $ulFilterList = document.querySelector('.filters');

let liTemplateList = [];

const todoListCounter = () => {
    $spanTodoCounter.querySelector('strong').textContent = liTemplateList.length;
};

const todoListAddTitle = ({key}) => {
    if (key === 'Enter' && $inputTodoNewTitle.value.length !== 0) {
        liTemplateList.push({title: $inputTodoNewTitle.value, status: false});
        let template = renderNewToDoTemplate($inputTodoNewTitle.value, false);
        $ulTodoList.insertAdjacentHTML('beforeend', template);
        $inputTodoNewTitle.value = '';
        todoListCounter();
    }
};

const removeClassList = (target) => {
    target.closest('li').classList.remove('editing');
};

const handleInputKey = (target, key, temp) => {
    if (key === 'Escape') {
        removeClassList(target);
    } else if (key === 'Enter') {
        removeClassList(target);
        target.parentNode.querySelector('label').textContent = target.value;
    }
};

const todoListOnToggle = ({target}) => {
    if (target.className === 'toggle') {
        target.closest('li').classList.toggle('completed');
    } else if (target.className === 'destroy') {
        target.closest('li').remove();
        todoListCounter();
    }
};

const todoListDoubleClickedOnToggle = ({target}) => {
    if (target.nodeName === 'LABEL') {
        const temp = target.closest('label').textContent;
        target.closest('li').classList.toggle('editing');
        const $inputEdit = target.closest('.editing').querySelector('.edit');
        $inputEdit.value = temp;
        $inputEdit.addEventListener('keyup', (e) => {
            handleInputKey(e.target, e.key, temp);
        });
    }
};
const reRender = (className) => {

    if ($ulTodoList.querySelectorAll('li') !== null) {
        $ulTodoList.querySelectorAll('li').forEach((n) => {
                if(n.className === 'all selected'){
                }else if(n.className === 'complete'){

                }else if(n.className === 'active'){

                }

            }
        );
    }
}

const getTodoFilter = ({target}) => {
    // console.log(target.className);
    reRender(target.className);
};

const renderNewToDoTemplate = (title, status) => {
    return ` <li class=${status ? 'completed' : ''}>
                    <div class="view">
                        <input class="toggle" type="checkbox" ${
        status ? 'checked' : ''
    }>
                        <label class="label">${title}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="새로운 타이틀">
                </li>`;
};

$inputTodoNewTitle.addEventListener('keyup', todoListAddTitle);
$ulTodoList.addEventListener('click', todoListOnToggle);
$ulTodoList.addEventListener('dblclick', todoListDoubleClickedOnToggle);
$ulFilterList.addEventListener('click', getTodoFilter);
