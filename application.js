// 자주 사용되는 HTML 요소들을 저장해두기 위한 변수
let newTodoInput = null
let todoList = null
let filters = null
let filterAll = null
let filterActive = null
let filterCompleted = null
let selectedFilter = null
// 자주 사용되는 객체, 상수값을 저장해두기 위한 변수
let todoElementsNameArray = null
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
    todoElementsNameArray = JSON.parse(localStorage.getItem(KEYWORD)) ?? []
    // 저장된 할 일 항목 각각에 대해 할일 추가 로직 수행.
    todoElementsNameArray.forEach(elementName =>
        drawNewTodo({'text':elementName, 'isDone':localStorage.getItem(elementName)})
    )
    
}

// 사용자 입력으로 새로운 할 일이 추가되는 함수
function addNewTodo(event){
    // 기본적인 예외 처리(공백 문자열, 중복 할 일 등)
    text = newTodoInput.value.trimStart().trimEnd()
    if(event.key != 'Enter' || text.length == 0){
        newTodoInput.focus()
        return;
    }

    if(todoElementsNameArray.indexOf(text) >= 0){
        alert('That ToDo is already exist!')
        return;
    }

    newTodoInput.value = ''
    // 별 문제가 없다면 입력된 내용으로 새로운 할 일을 추가.
    drawNewTodo({'text':text,'isDone':'false'})
    // 브라우저 localStorage에도 해당 할 일 저장 후 현재 선택된 필터에 맞게 가시성 조절.
    localStorage.setItem(text, false)
    selectedFilter.dispatchEvent(new Event('click', {bubbles: true}))
    // 내부적으로 유지하고 있는 할 일 리스트에도 저장 후 이 리스트 역시 localStorage에 저장.
    todoElementsNameArray.push(text)
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsNameArray))
    /**
     * 왜 localStorage에도 저장하고 할 일 리스트에도 저장 후 다시 리스트를 localStorage에도 저장하는가?
     * --> 현재 localStorage에는 다음과 같은 항목들이 저장됨.
     *     - 할 일의 리스트({KEYWORD: ['todo1', 'todo2', ...]})
     *     - 어떤 할 일의 완료 여부({'todo1':true}, {'todo2':false})
     *     할 일 내용의 리스트는 페이지 로드 시 저장되어 있는 할 일들을 불러오기 위해서 KEYWORD 상수키의 값으로 저장하고 있음.
     *     각각의 할 일들은 자신을 키로 하여 localStorage에 저장된 값(true/false)을 불러와서 할 일 완료 여부를 파악
     *     즉 페이지 로드 시 다음과 같이 동작함.
     *     - localStorage에서 KEYWORD 상수키의 값을 불러와 할 일 목록에 저장.
     *     - 할 일 목록에 저장된 할 일들에 대하여 각각(forEach) 자신을 키로 하여 localStorage에서 완료 여부를 가져옴.
     *     - 할 일 목록에 저장된 할 일들은 완료 여부에 따라 할 일 추가 시 checked 속성 부여
     *     할 일이 추가되거나 삭제, 변경 시 localStorage에 저장된 할 일의 완료 여부 뿐 아니라 할 일의 리스트에도 적용
     *     결과적으로 재접속 시에도 변경사항이 유지되도록 함.
     * 
     *     최적의 방법은 아닐듯.
     */
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
        <input class="edit" onkeyup="updateTodoEdit(event)" value=${todo.text}></input>
    `
    li.addEventListener('click', onTodoElementClicked)
    li.addEventListener('dblclick', onTodoElementDblclicked)
    li.innerHTML = newTodoHTMLElement
    todoList.append(li)
    updateCountText()
    if(todo.isDone === 'true'){
        // todoList.children[todoList.children.length - 1].querySelector('li div input.toggle').dispatchEvent(new Event('click'))
        todoList.querySelector('li:last-child div input.toggle').dispatchEvent(new Event('click', {bubbles: true}))
    }
}

function onTodoElementClicked(event){
    if(event.target && event.target.nodeName == 'INPUT'){
        toggleTodoElementStatus(event)
    } else if(event.target && event.target.nodeName == 'BUTTON'){
        removeCurrentTodoElement(event)
    } else {
        return
    }
}


function onTodoElementDblclicked(event){
    if(event.target && event.target.nodeName == 'LABEL'){
        toggleTodoElementMode(event)
    } else {
        return
    }
}


function filterViewChange(event){
    if(!event.target || event.target.nodeName != 'A'){
        return
    } 

    todoListCount = todoList.querySelectorAll('li').length
    todoElements = todoList.children
    selectedFilter.classList.remove('selected')
    clickedFilter = event.target.classList

    if(clickedFilter.contains('all')){
        selectedFilter = filterAll
        for(index=0;index<todoListCount;index++){
            todoElements[index].style.display = ""
        }
    } else if(clickedFilter.contains('active')){
        selectedFilter = filterActive
        for(index=0;index<todoListCount;index++){
            todoElements[index].style.display = todoElements[index].querySelector('div input').getAttribute('checked') == null ? "" : "none"
        }
    } else if(clickedFilter.contains('completed')){
        selectedFilter = filterCompleted
        for(index=0;index<todoListCount;index++){
            todoElements[index].style.display = todoElements[index].querySelector('div input').getAttribute('checked') == null ? "none" : ""
        }
    }

    selectedFilter.classList.add('selected')
    updateCountText()
}


// 할 일 삭제 이벤트 처리기.
function removeCurrentTodoElement(event){
    // 삭제된 할 일을 할 일 목록에서 제거.
    removedTodoName = event.target.parentNode.querySelector('label').innerText
    todoElementsNameArray.splice(todoElementsNameArray.indexOf(removedTodoName), 1)
    // localStorage에 저장된 할 일 데이터를 지우고 할 일 목록을 업데이트.
    localStorage.removeItem(removedTodoName)
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsNameArray))
    // 실제로 HTML 요소를 삭제하고 카운터 업데이트.
    // event.target.parentNode.parentNode.remove()
    event.target.closest('li').remove()
    updateCountText()
}

// 할 일 변경 이벤트 처리기.
function updateTodoEdit(event){
    todoElementLI = event.target.parentNode
    // ESC를 눌렀다면 편집 모드 종료, Enter를 눌렀다면 편집 적용.
    if(event.key == 'Escape'){
        todoElementLI.classList.toggle('editing')
    } else if (event.key == 'Enter'){
        // 각각 변경된 할 일 텍스트, 원래 할 일 텍스트.
        newTodoText = event.target.value.trimStart().trimEnd()
        updatedTodoText = todoElementLI.querySelector('div label').innerText
        
        // 입력값 필터링.
        if(newTodoText.length == 0){
            event.target.focus()
        }
        
        if(todoElementsNameArray.includes(newTodoText)){
            alert('That ToDo is already exist!')
            return;
        }

        // localStorage에서 해당 할 일의 완료 여부를 가져와서 따로 저장 후 해당 할 일 삭제.
        status = localStorage.getItem(updatedTodoText)
        localStorage.removeItem(updatedTodoText)
        // localStorage에 변경된 할 일의 텍스트로 새로운 항목 저장. 위에서 따로 저장해둔 완료 여부를 적용.
        localStorage.setItem(newTodoText, status)
        // 할 일 목록에서도 변경사항 적용 및 localStorage에 반영.
        todoElementsNameArray.splice(todoElementsNameArray.indexOf(updatedTodoText), 1, newTodoText)
        localStorage.setItem(KEYWORD, JSON.stringify(todoElementsNameArray))
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
function toggleTodoElementMode(event){
    todoElementLI = event.target.parentNode.parentNode
    todoElementLI.classList.toggle('editing')
}

// 할 일 완료 여부 체크/체크 해제 시 속성 부여, 제거 로직.
function toggleTodoElementStatus(event){
    isChecked = event.target.getAttribute('checked')
    todoElementLI = event.target.parentNode.parentNode
    event.target.toggleAttribute('checked')
    localStorage.setItem(todoElementLI.querySelector('div label').innerText, isChecked == null)
    todoElementLI.classList.toggle('completed')
    // manually bubble it!
    selectedFilter.dispatchEvent(new Event('click', {bubbles: true}))
    updateCountText()
}
