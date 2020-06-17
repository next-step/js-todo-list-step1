function TodoInput($todoInput, $todoList){
    //더 상세한 validation?
    if (!$todoInput || !$todoList){
        throw new Error('ERROR: Invalid object')
    }

    this.$todoInput = $todoInput
    this.$targetList = $todoList

    this.$todoInput.addEventListener('keypress', (e) => {
        if (e.keyCode === ENTER_KEY){
            if (!/\S/.test(this.$todoInput.value) || this.$todoInput === null){
                alert('할일을 입력하세요!')
                return
            }

            this.$targetList.innerHTML += `<li>
            <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${this.$todoInput.value}</label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="${this.$todoInput.value}" />
            </li>`

            this.$todoInput.value = ''
        }
    })
}