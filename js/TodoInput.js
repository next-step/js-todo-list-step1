function TodoInput($todoInput, onAdd){
    //더 상세한 validation?
    if (!$todoInput){
        throw new Error('ERROR: Invalid object')
    }

    this.$todoInput = $todoInput

    this.$todoInput.addEventListener('keyup', (e) => {
        if (e.keyCode === ENTER_KEY){
            if (!/\S/.test(this.$todoInput.value)){
                alert('할일을 입력하세요!')
                return
            }

            onAdd(this.$todoInput.value)

            this.$todoInput.value = ''
        }
    })
}
