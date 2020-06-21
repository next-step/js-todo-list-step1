function TodoList($todoList, data){
    this.$todoList = $todoList
    this.data = data

    this.setState = (nextData) => {
        this.data = [...this.data, nextData]
        this.render(nextData.text)
        this.bindEvents()
    }

    this.bindEvents = () => {
        document.querySelectorAll('.todo-item').forEach($item => {
            $item.querySelector('input.toggle').addEventListener('click', (e)=>{
                e.stopPropagation()  //이벤트 버블링 막기
                const $todoItem = e.target.closest('.todo-item')

                if ($todoItem.classList.contains('completed')){
                    $todoItem.classList.remove('completed')
                }
                else{
                    $todoItem.classList.add('completed')
                }
            })
        })
    }

    this.render = (text) => {
        let result = ''
        this.data.map(({ text }, index) => {
            result += `<li class="todo-item" data-index="${index}">
            <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">${text}</label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="${text}" />
            </li>`
        }).join('')

        this.$todoList.innerHTML = result
    }
}