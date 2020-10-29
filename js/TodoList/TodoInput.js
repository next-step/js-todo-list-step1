class TodoInput {
    constructor (parent, item) {
        console.log('TEST: TodoList TodoInput', );
        this.$TodoInput = document.getElementById('new-todo-title')
        this.$TodoInput.addEventListener('keyup', (e) => {
            console.log('TEST: input keyup event', parent, item);
            if (e.key === "Enter" ) {
                console.log('TEST: Enter', this.$TodoInput);
                const input = this.$TodoInput.value.trim()
                parent.addItem(input)
                this.$TodoInput.value = '';
            }
        })
    }
}
export { TodoInput }