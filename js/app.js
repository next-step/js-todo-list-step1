console.log('script loaded');

const isEmpty = str => {
    return (!str || 0 === str.length);
}

const onCheckButtonPress = e => {
    let targetElement = e.target.parentNode.parentNode;
    if(targetElement.className === 'completed') {
        targetElement.className = '';
        return;
    }

    targetElement.className = 'completed';
}

const onDeleteButtonPress = e => {
    let targetElement = e.target.parentNode;
    targetElement.style.display = 'none';
}

const onContentEditCompleted = e => {
    if(e.key === 'Enter') {
        e.target.style.display = 'none';

        let newRow = document.importNode(document.querySelector('#item-new').content, true);
        newRow.querySelector('.toggle').addEventListener('click', onCheckButtonPress);
        newRow.querySelector('.destroy').addEventListener('click', onDeleteButtonPress);
        newRow.querySelector('.view').addEventListener('dblclick', onItemDoubleClick);
        let targetListSection = document.querySelector('#todo-list');

        newRow.getElementById('item-label').innerHTML = e.target.value;

        targetListSection.appendChild(newRow);
    }
}

const onItemDoubleClick = e => {
    console.log('double click detected');
    
    let targetElement = e.target;
    let targetElementParent = e.target.parentNode;
    
    let editingRow = document.importNode(document.querySelector('#item-editing').content, true);
    editingRow.querySelector('.edit').addEventListener('keydown', onContentEditCompleted);
    editingRow.querySelector('.edit').value = targetElement.innerHTML;


    targetElement.style.display = 'none'
    targetElementParent.appendChild(editingRow);
}

const onNewItemSubmit = e => {
    if(e.key === 'Enter') {
        let inputSection = document.getElementById('new-todo-title');

        let itemTitle = inputSection.value;
        if(isEmpty(itemTitle)) {
            return;
        }
        
        let newRow = document.importNode(document.querySelector('#item-new').content, true);
        newRow.querySelector('.toggle').addEventListener('click', onCheckButtonPress);
        newRow.querySelector('.destroy').addEventListener('click', onDeleteButtonPress);
        newRow.querySelector('.view').addEventListener('dblclick', onItemDoubleClick);
        let targetListSection = document.querySelector('#todo-list');

        newRow.getElementById('item-label').innerHTML = itemTitle;
        inputSection.value = '';

        targetListSection.appendChild(newRow);
        return;
    }
};

document.getElementById('new-todo-title').addEventListener('keydown', onNewItemSubmit);
