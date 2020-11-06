var num = 0

function enterkey() {
    if(window.event.keyCode == 13) {
        
        const inputTodo = document.querySelector('#new-todo-title')
        const ul = document.querySelector('#todo-list')
        const li = document.createElement('li')
        const div = document.createElement('div')
        const close = document.createElement('button')
        const checkBox = document.createElement('input')
        const label = document.createElement('label')
        const editInput = document.createElement('input')
        const count = document.querySelector('.todo-count')
        

        checkBox.setAttribute('class', 'toggle')
        checkBox.setAttribute('type', 'checkbox')
        close.setAttribute('class', 'destroy')
        label.textContent = inputTodo.value;
        li.appendChild(div, editInput)
        div.append(checkBox, label, close)
        ul.appendChild(li)

        
        inputTodo.value = ''

        num++
        count.textContent = "총 " + num + "개"
        
        //체크박스
        checkBox.addEventListener('click', function() {
            checkBox.setAttribute('checked', 'checked')
            li.classList.add('completed')
        })

        
        //수정 시
        li.addEventListener('dblclick' , function() {
            li.classList.add('editing')
            editInput.classList.add('edit')
            div.setAttribute('class', 'view')
            li.append(editInput)
            editInput.value = label.textContent
        })

        //ESC가 눌렸을 때
        editInput.addEventListener('keydown', function(){
            if(window.event.keyCode == 27) {
                li.classList.remove('editing')
                editInput.classList.remove('edit')
                label.classList.remove('view')
                label.textContent = editInput.value
                li.removeChild(editInput)
            }
        })

        
        

        // 삭제 버튼
        close.addEventListener('click', function() {
            const answer = confirm("정말로 삭제하시겠습니까?")
            if(answer){
                ul.removeChild(li)
                num--
                count.textContent = "총 " + num + "개"
             }
        })

    }
}