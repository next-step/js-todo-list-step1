class TodoList {
    constructor (parent) {
        this.$TodoList = document.getElementById('todo-list')
        this.$TodoList.addEventListener('click', (e) => {
            if (e.target.className === 'destroy') {
                const parentElement = e.target.closest('li')
                parent.deleteItem(parentElement)
            }
        })
        this.$TodoList.addEventListener('change', (e) => {
            if ( e.target.className === 'toggle') {
                parentElement.className = 'completed'
                console.log('TEST: body click toggle', parent);
                parent.completeItem(parentElement)
            }
        })
        this.$TodoList.addEventListener('dblclick', (e) => {
            const parentElement = e.target.closest('li')
            parentElement.className = 'editing'
        })
        this.$TodoList.addEventListener('keyup', (e) => {
            if ( e.key === 'Enter' ) {
                const parentElement = e.target.closest('li')
                const value = e.target.value
                parent.afterUpdateItem(parentElement, value)
            }
        })
    }
}
export { TodoList }