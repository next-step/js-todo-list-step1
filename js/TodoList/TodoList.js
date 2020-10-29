class TodoList {
    constructor (parent, item) {
        console.log('TEST: TodoList TodoList', );
        this.$TodoList = document.getElementById('todo-list')
        
        console.log('TEST: body', this.$TodoListComplete);
        this.$TodoList.addEventListener('click', (e) => {
            if (e.target.className === 'destroy') {
                console.log('TEST: body click destory', e);
                const parentElement = e.target.closest('li')
                parent.deleteItem(parentElement)
            }
        })
        this.$TodoList.addEventListener('change', (e) => {
            if ( e.target.className === 'toggle') {
                const parentElement = e.target.closest('li')
                parentElement.className = 'completed'
                console.log('TEST: body click toggle', parent);
                parent.completeItem(parentElement)
            }
        })
        this.$TodoList.addEventListener('dblclick', (e) => {
            console.log('TEST: dbclick', e);
            const parentElement = e.target.closest('li')
            parentElement.className = 'editing'
        })
        this.$TodoList.addEventListener('keyup', (e) => {
            if ( e.key === 'Enter' ) {
                const parentElement = e.target.closest('li')
                const value = e.target.value
                console.log('TEST: updated keyup ', parent, parentElement, value);
                parent.afterUpdateItem(parentElement, value)
            }
        })
    }
}
export { TodoList }