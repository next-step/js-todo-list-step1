// 자주 사용되는 HTML 요소들을 저장해두기 위한 변수
let newTodoInput = null
let todoList = null
let filters = null
let filterAll = null
let filterActive = null
let filterCompleted = null
let selectedFilter = null
// 자주 사용되는 객체, 상수값을 저장해두기 위한 변수
let todoElementsArray = []
const KEYWORD = "gTZ5JMw51a"

window.onload = () => init()

// 웹페이지 로드 시 실행되는 함수
function init(){
    // 초기화되지 않은 변수들을 HTML 요소로 초기화
    newTodoInput = document.getElementById('new-todo-title')
    todoList = document.getElementById('todo-list')
    filters = document.querySelector('ul.filters')
    filterAll = filters.querySelector('li a.all')
    filterActive = filters.querySelector('li a.active')
    filterCompleted = filters.querySelector('li a.completed')
    // 해당 변수들에 대한 적절한 이벤트 처리기 등록
    filters.addEventListener('click', filterViewChange)
    newTodoInput.addEventListener('keyup', addNewTodo)
    selectedFilter = filterAll

    // 저장된 할 일 항목이 있는지 확인, 있다면 불러오고 없다면 초기화.
    todoElementsArray = JSON.parse(localStorage.getItem(KEYWORD)) ?? []
    /**
     * todoElementsNameArray: [todoElement1, [todoElement2, ...]]
     * todoElement:
     *     - id: string. unique id of each todo element. attached to <li>
     *     - text: string. text of each todo element. attached to <label> and <input>
     *     - isDone: boolean. completed(or not) status of each todo element.
     */
    // 저장된 할 일 항목 각각에 대해 할일 추가 로직 수행.
    todoElementsArray.forEach(todoElement =>
        drawNewTodo({'id':todoElement.id, 'text':todoElement.text, 'isDone':todoElement.isDone})
    )
    
}

// 사용자 입력으로 새로운 할 일이 추가되는 함수
function addNewTodo(event){
    // 기본적인 예외 처리(공백 문자열, 중복 할 일 등)
    text = newTodoInput.value.trimStart().trimEnd()
    if(event.key != 'Enter' || text.length === 0){
        newTodoInput.focus()
        return;
    }

    for(const otherTodoElement of todoElementsArray){
        if(text === otherTodoElement.text){
            alert('That ToDo already exists!')
            return;
        }
    }

    newTodoInput.value = ''
    // 별 문제가 없다면 입력된 내용으로 새로운 할 일을 추가.
    const dateNow = Date.now().toString()
    drawNewTodo({'id':dateNow, 'text':text, 'isDone':false})
    // 브라우저 localStorage에도 해당 할 일 저장 후 현재 선택된 필터에 맞게 가시성 조절.
    selectedFilter.dispatchEvent(new Event('click', {bubbles: true}))
    // 내부적으로 유지하고 있는 할 일 리스트에도 저장 후 이 리스트 역시 localStorage에 저장.
    todoElementsArray.push({'id':dateNow, 'text':text, 'isDone':false})
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
}

// 할 일 추가 시 실제로 HTML 요소를 그리는 함수
function drawNewTodo(todo){
    li = document.createElement('li')
    newTodoHTMLElement = `
        <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">${todo.text}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${todo.text}></input>
    `
    li.id = todo.id
    li.addEventListener('click', onTodoElementClicked)
    li.addEventListener('dblclick', onTodoElementDblclicked)
    li.addEventListener('keyup', onTodoElementKeyupped)
    li.innerHTML = newTodoHTMLElement
    todoList.append(li)
    updateCountText()
    if(todo.isDone === true){
        // todoList.children[todoList.children.length - 1].querySelector('li div input.toggle').dispatchEvent(new Event('click'))
        todoList.querySelector('li:last-child div input.toggle').dispatchEvent(new Event('click', {bubbles: true}))
    }
}

function onTodoElementClicked(event){
    if(event.target && event.target.nodeName === 'INPUT' && event.target.classList.contains('toggle')){
        toggleTodoElementStatus(event)
    } else if(event.target && event.target.nodeName === 'BUTTON'){
        removeCurrentTodoElement(event)
    } else {
        return
    }
}


function onTodoElementDblclicked(event){
    if(event.target && event.target.nodeName === 'LABEL'){
        toggleTodoElementMode(event)
    } else {
        return
    }
}


function onTodoElementKeyupped(event){
    if(event.target && event.target.nodeName === 'INPUT'){
        updateTodoEdit(event)
    } else {
        return
    }
}


function filterViewChange({ target }){
    if(!target || target.nodeName != 'A'){
        return
    } 

    todoListCount = todoList.querySelectorAll('li').length
    todoElements = todoList.children
    selectedFilter.classList.remove('selected')
    clickedFilter = target.classList

    if(clickedFilter.contains('all')){
        selectedFilter = filterAll
        for(index=0;index<todoListCount;index++){
            todoElements[index].style.display = ""
        }
    } else if(clickedFilter.contains('active')){
        selectedFilter = filterActive
        for(index=0;index<todoListCount;index++){
            todoElements[index].style.display = todoElements[index].querySelector('div input').getAttribute('checked') === null ? "" : "none"
        }
    } else if(clickedFilter.contains('completed')){
        selectedFilter = filterCompleted
        for(index=0;index<todoListCount;index++){
            todoElements[index].style.display = todoElements[index].querySelector('div input').getAttribute('checked') === null ? "none" : ""
        }
    }

    selectedFilter.classList.add('selected')
    updateCountText()
}


// 할 일 삭제 이벤트 처리기.
function removeCurrentTodoElement({ target }){
    // 삭제된 할 일을 할 일 목록에서 제거.
    removedTodoID = target.closest('li').id
    for(let todoElement of todoElementsArray){
        if(todoElement.id === removedTodoID){
            todoElementsArray.splice(todoElementsArray.indexOf(todoElement), 1)
            break
        }
    }
    // localStorage에 저장된 할 일 데이터를 지우고 할 일 목록을 업데이트.
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
    // 실제로 HTML 요소를 삭제하고 카운터 업데이트.
    // event.target.parentNode.parentNode.remove()
    target.closest('li').remove()
    updateCountText()
}

// 할 일 변경 이벤트 처리기.
function updateTodoEdit({ target, key }){
    todoElementLI = target.closest('li')
    // ESC를 눌렀다면 편집 모드 종료, Enter를 눌렀다면 편집 적용.
    if(key === 'Escape'){
        todoElementLI.classList.toggle('editing')
    } else if (key === 'Enter'){
        // 각각 변경된 할 일 텍스트, 원래 할 일 텍스트.
        newTodoText = target.value.trimStart().trimEnd()
        updatedTodoText = todoElementLI.querySelector('div label').innerText
        
        // 입력값 필터링.
        if(newTodoText.length === 0){
            target.focus()
        }
        
        for(let todoElement of todoElementsArray){
            if(todoElement.text === newTodoText){
                alert('That ToDo already exists!')
                return;
            }
        }

        // 할 일 목록에서도 변경사항 적용 및 localStorage에 반영.
        for(let todoElement of todoElementsArray){
            if(todoElement.id === todoElementLI.id){
                todoElement.text = newTodoText
                break
            }
        }
        localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
        // HTML 요소에서도 변경사항 적용.
        todoElementLI.querySelector('div label').innerText = newTodoText
        todoElementLI.classList.toggle('editing')
    }
}


// 할 일이 몇 개 있는지 출력하는 텍스트(총 n 개)를 업데이트하는 로직.
function updateCountText(){
    todoListCountText = document.querySelector('span.todo-count strong')
    switch(selectedFilter){
        case filterAll:
            todoListCountText.innerText = todoList.querySelectorAll('li').length
            break
        case filterActive:
            todoListCountText.innerText = todoList.querySelectorAll('li').length - todoList.querySelectorAll('li.completed').length
            break
        case filterCompleted:
            todoListCountText.innerText = todoList.querySelectorAll('li.completed').length
    }
}

// 할 일을 더블클릭 했을 때 편집 모드 토글 로직.
function toggleTodoElementMode({ target }){
    target.closest('li').classList.toggle('editing')
}

// 할 일 완료 여부 체크/체크 해제 시 속성 부여, 제거 로직.
function toggleTodoElementStatus({ target }){
    target.toggleAttribute('checked')
    todoElementLI = target.closest('li')
    todoElementLI.classList.toggle('completed')
    for(let todoElement of todoElementsArray){
        if(todoElement.id === todoElementLI.id){
            todoElement.isDone = (target.getAttribute('checked') != null)
        }
    }
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
    // manually bubble it!
    selectedFilter.dispatchEvent(new Event('click', {bubbles: true}))
    updateCountText()
}

