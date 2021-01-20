let newTodoInput = null
let todoList = null
let todoElements = null
let todoListCount = 0
let filters = null
let filterAll = null
let filterActive = null
let filterCompleted = null
let filterContainer = null
let selectedFilter = null

let todoElementsNameArray = null
const ToDoElementStorage = window.localStorage
const ENTER_KEYCODE = 13
const ESC_KEYCODE = 27
const KEYWORD = "gTZ5JMw51a"


function init(){
    newTodoInput = document.getElementById('new-todo-title')
    todoList = document.getElementById('todo-list')
    todoElements = todoList.children
    filters = document.querySelector('ul.filters')
    filterAll = filters.querySelector('li a.all')
    filterActive = filters.querySelector('li a.active')
    filterCompleted = filters.querySelector('li a.completed')

    newTodoInput.addEventListener('keydown', addNewTodo)
    filterAll.addEventListener('click', filterAllViewChange)
    filterActive.addEventListener('click', filterActiveViewChange)
    filterCompleted.addEventListener('click', filterCompletedViewChange)
    filterContainer = [filterAll, filterActive, filterCompleted]
    selectedFilter = filterAll

    todos = ToDoElementStorage.getItem(KEYWORD)
    if(todos == null){
        todos = JSON.stringify([])
        ToDoElementStorage.setItem(KEYWORD, todos)
    }
    todoElementsNameArray = JSON.parse(todos)
    todoElementsNameArray.forEach(elementName =>
        drawNewTodo(elementName, localStorage.getItem(elementName)=='true')
    )
    
}

function addNewTodo(event){
    if (event.keyCode != ENTER_KEYCODE) return
    text = newTodoInput.value.trimStart().trimEnd()
    if(text.length == 0){
        newTodoInput.focus()
        return;
    }

    newTodoInput.value = ''
    if(todoElementsNameArray.indexOf(text) >= 0){
        alert('That ToDo is already exist!')
        return;
    }

    drawNewTodo(text)
    
    ToDoElementStorage.setItem(text, false)
    selectedFilter.dispatchEvent(new Event('click'))

    todoElementsNameArray.push(text)
    ToDoElementStorage.setItem(KEYWORD, JSON.stringify(todoElementsNameArray))
    // TODO: this feature, but for modify and remove.
}

function drawNewTodo(text, isDone=false){
    let newTodoElement = document.createElement('li')
    let newTodoElementViewBox = document.createElement('div')

    let newTodoElementInput = document.createElement('input')
    newTodoElementInput.className = 'toggle'
    newTodoElementInput.type = 'checkbox'
    newTodoElementInput.addEventListener('click', toggleTodoElementStatus)

    let newTodoElementLabel = document.createElement('label')
    newTodoElementLabel.className = 'label'
    newTodoElementLabel.textContent = text
    newTodoElementLabel.addEventListener('dblclick', toggleTodoElementMode)

    let newTodoElementButton = document.createElement('button')
    newTodoElementButton.className = 'destroy'
    newTodoElementButton.addEventListener('click', removeCurrentTodoElement)

    newTodoElementViewBox.appendChild(newTodoElementInput)
    newTodoElementViewBox.appendChild(newTodoElementLabel)
    newTodoElementViewBox.appendChild(newTodoElementButton)

    let newTodoElementEditInput = document.createElement('input')
    newTodoElementEditInput.className = 'edit'
    newTodoElementEditInput.value = text
    newTodoElementEditInput.addEventListener('keydown', updateTodoEdit)

    newTodoElement.appendChild(newTodoElementViewBox)
    newTodoElement.appendChild(newTodoElementEditInput)
    
    todoList.append(newTodoElement)
    updateCountText(1)
    if(isDone){
        newTodoElementInput.dispatchEvent(new Event('click'))
    }
}


function filterAllViewChange(event){
    selectedFilter = filterAll
    for(i=0;i<filterContainer.length;i++) {
        filterContainer[i].classList.remove('selected')
    }
    filterAll.classList.add('selected')
    
    for(index=0;index<todoListCount;index++){
        todoElements[index].style.display = ""
    }
}

function filterActiveViewChange(event){
    selectedFilter = filterActive
    for(i=0;i<filterContainer.length;i++) {
        filterContainer[i].classList.remove('selected')
    }
    filterActive.classList.add('selected')
    
    for(index=0;index<todoListCount;index++){
        if(todoElements[index].querySelector('div input').getAttribute('checked') != null){
            todoElements[index].style.display = "none"
        } else {
            todoElements[index].style.display = ""
        }
    }
}

function filterCompletedViewChange(event){
    selectedFilter = filterCompleted
    for(i=0;i<filterContainer.length;i++) {
        filterContainer[i].classList.remove('selected')
    }
    filterCompleted.classList.add('selected')
    
    for(index=0;index<todoListCount;index++){
        if(todoElements[index].querySelector('div input').getAttribute('checked') == null){
            todoElements[index].style.display = "none"
        } else {
            todoElements[index].style.display = ""
        }
    }
}


function removeCurrentTodoElement(event){
    removedTodoName = event.target.parentNode.querySelector('label').innerText
    todoElementsNameArray.splice(todoElementsNameArray.indexOf(removedTodoName), 1)
    ToDoElementStorage.removeItem(removedTodoName)
    ToDoElementStorage.setItem(KEYWORD, JSON.stringify(todoElementsNameArray))
    event.target.parentNode.parentNode.remove()
    updateCountText(-1)
}

function updateTodoEdit(event){
    todoElementLI = event.target.parentNode
    if(event.keyCode == ESC_KEYCODE){
        todoElementLI.classList.toggle('editing')
    } else if (event.keyCode == ENTER_KEYCODE){
        newTodoText = event.target.value.trimStart().trimEnd()
        updatedTodoText = todoElementLI.querySelector('div label').innerText

        if(newTodoText.length == 0){
            event.target.focus()
        }
        is_dup = false
        todoElementsNameArray.forEach(element => {
            if(element == newTodoText){
                is_dup = true
            }
        })
        if(is_dup){
            alert('That ToDo is already exist!')
            return;
        }

        status = ToDoElementStorage.getItem(updatedTodoText)
        ToDoElementStorage.removeItem(updatedTodoText)
        ToDoElementStorage.setItem(newTodoText, status)
        todoElementsNameArray.splice(todoElementsNameArray.indexOf(updatedTodoText), 1, newTodoText)
        ToDoElementStorage.setItem(KEYWORD, JSON.stringify(todoElementsNameArray))
        todoElementLI.querySelector('div label').innerText = newTodoText
        todoElementLI.classList.toggle('editing')
    }
}

function updateView(){
    // ???
}

function updateCountText(change=0){
    todoListCount += change
    todoListCountText = document.querySelector('span.todo-count strong')
    todoListCountText.innerText = todoListCount
}

function toggleTodoElementMode(event){
    todoElementLI = event.target.parentNode.parentNode
    todoElementLI.classList.toggle('editing')
}

function toggleTodoElementStatus(event){
    isChecked = event.target.getAttribute('checked')
    todoElementLI = event.target.parentNode.parentNode
    if (isChecked == null){
        event.target.setAttribute('checked', '')
        ToDoElementStorage.setItem(todoElementLI.querySelector('div label').innerText, true)
    } else {
        event.target.removeAttribute('checked', '')
        ToDoElementStorage.setItem(todoElementLI.querySelector('div label').innerText, false)
    }
    todoElementLI.classList.toggle('completed')
    selectedFilter.dispatchEvent(new Event('click'))
}
