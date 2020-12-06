import { ENTER, ESC } from './KeyVariable.js'

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
                const parentElement = e.target.closest('li')
                parent.completeItem(parentElement)
            }
        })
        this.$TodoList.addEventListener('dblclick', (e) => {
            const parentElement = e.target.closest('li')
            parentElement.className = 'editing' // 이부분을 랜더링 할때 적용 해야 함. 
            const editInput = parentElement.querySelector('.edit')
            editInput.focus()
        })
        this.$TodoList.addEventListener('keyup', (e) => {
            if ( e.key === ENTER ) {
                const parentElement = e.target.closest('li')
                const value = e.target.value
                parent.afterUpdateItem(parentElement, value)
            }
            if ( e.key === ESC ) {
                const parentElement = e.target.closest('li')
                parentElement.className = ''
                parent.render()
            }
        })
    }
}
export { TodoList }