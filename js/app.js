console.log('script loaded');

const isEmpty = str => {
    return (!str || 0 === str.length);
}

const onNewItemSubmit = e => {
    if(e.key === 'Enter') {
        let inputSection = document.getElementById('new-todo-title');

        let itemTitle = inputSection.value;
        if(isEmpty(itemTitle)) {
            return;
        }
        
        let newRow = document.importNode(document.querySelector('#item-new').content, true);
        let targetListSection = document.querySelector('#todo-list');

        newRow.getElementById('item-label').innerHTML = itemTitle;
        inputSection.value = '';

        targetListSection.appendChild(newRow);
        return;
    }
}

document.getElementById('new-todo-title').addEventListener('keydown', onNewItemSubmit);
