class Body {
    constructor (parent, item) {
        console.log('TEST: TodoList Body', );
        this.$TodoList = document.getElementById('todo-list')
        
        console.log('TEST: body', this.$TodoListComplete);
        this.$TodoList.addEventListener('click', (e) => {
            console.log('TEST: body click', e);
        })
        this.$TodoList.addEventListener('change', (e) => {
            console.log('TEST: body change', e)
            if ( e.target.className === 'toggle') {
                let parentElement = e.target.closest('li')
                parentElement.className = 'completed'
                console.log('TEST: ', parent);
                parent.completeItem(parentElement)
            }
        })
    }
}
export { Body }