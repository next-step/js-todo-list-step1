function TodoList($todoList, data, removeItem) {
    this.$todoList = $todoList
    this.data = data

    this.updateItem = (nextData) => {
        // 왜 this.data === nextData?
        this.data = [...nextData]
        this.render()
        this.bindEvents()
    }

    this.editItem = (index, text) => {
        this.data[index].text = text
        this.render()
        this.bindEvents()
    }

    this.bindEvents = () => {
        document.querySelectorAll('.todo-item').forEach($item => {
            $item.querySelector('input.toggle').addEventListener('click', (e) => {
                e.stopPropagation() // 이벤트 버블링 막기
                const $todoItem = e.target.closest('.todo-item')

                if ($todoItem.classList.contains('completed')) {
                    $todoItem.classList.remove('completed')
                } else {
                    $todoItem.classList.add('completed')
                }
            })

            $item.querySelector('button.destroy').addEventListener('click', (e) => {
                e.stopPropagation()
                const { index } = e.target.closest('.todo-item').dataset // {} obj destruction해줘야함
                removeItem(index)
            })

            $item.querySelector('label').addEventListener('dblclick', (e) => {
                e.stopPropagation()
                const $todoItem = e.target.closest('.todo-item')
                const { index } = e.target.closest('.todo-item').dataset
                const oldValue = e.target.innerText

                $todoItem.classList.add('editing')
                $todoItem.addEventListener('keyup', (e) => {
                    if (e.keyCode === ESC_KEY) {
                        $todoItem.classList.remove('editing')
                        e.target.value = oldValue
                    } else if (e.keyCode === ENTER_KEY) {
                        this.editItem(index, e.target.value)
                    }
                })
            })
        })
    }

    this.render = () => {
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
