import {todoElementsArray, KEYWORD, updateCountText} from './common.js'

// TODO: 이걸 호출하지 않아도 실행될 수 있도록 하는 방법은? 변수 선언 말고는 이 안에서밖에 안되나??
// filterview.js의 경우도 비슷하게 변수 선언 및 값 대입은 잘 되는데 이벤트 리스너 등록은 결국 함수가 필요..
export function initTodos(){
    // 새로운 할 일 입력폼에 이벤트 리스너 등록
    document.getElementById('new-todo-title').addEventListener('keyup', addNewTodo)
    // 저장된 할 일 항목 각각에 대해 할일 추가 로직 수행.
    todoElementsArray.forEach(todoElement => {
        drawNewTodo({'id':todoElement.id, 'text':todoElement.text, 'isDone':todoElement.isDone})
    }) 
}


function checkDuplicates(text){
    return todoElementsArray.filter(todoElement => todoElement.text == text).length > 0
}


function findTodoElement(value, property){
    return todoElementsArray.filter((todoElement) => todoElement[property] === value)[0]
}

//
//
// do something about update count text!!
//



// 사용자 입력으로 새로운 할 일이 추가되는 함수
function addNewTodo(event){
    // 기본적인 예외 처리(공백 문자열, 중복 할 일 등)
    const newTodoInput = document.getElementById('new-todo-title')
    const newTodoText = newTodoInput.value.trimStart().trimEnd()
    if(event.key != 'Enter' || newTodoText.length === 0){
        newTodoInput.focus()
        return;
    }

    if(checkDuplicates(newTodoText)){
        alert('That ToDo already exists!')
        return
    }

    newTodoInput.value = ''
    // Date.now()로 얻은 현재 시간을 고유값으로 사용.
    const dateNow = Date.now().toString()
    drawNewTodo({'id':dateNow, 'text':newTodoText, 'isDone':false})
    // 현재 보고 있는 할 일들이 완료된 할 일일 경우를 고려, 할 일 추가 후 필터를 다시 적용.
    document.querySelector('ul.filters li a[class*="selected"').dispatchEvent(new Event('click', {bubbles: true}))
    // 내부적으로 유지하고 있는 할 일 리스트에도 저장 후 localStorage에도 반영.
    todoElementsArray.push({'id':dateNow, 'text':newTodoText, 'isDone':false})
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
}

// 할 일 추가 시 실제로 HTML 요소를 그리는 함수
function drawNewTodo(todo){
    const todoList = document.getElementById('todo-list') 
    const li = document.createElement('li')
    const newTodoHTMLElement = `
        <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">${todo.text}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${todo.text}></input>
    `
    // 추후 접근 편의를 위해 <li> 태그의 id를 해당 할 일의 고유값으로 설정.
    li.id = todo.id
    // 해당 할 일에 대한 클릭(완료 상태 토글, 삭제), 더블클릭(편집모드 진입), 키 입력(편집모드 종료, 변경내역 반영) 이벤트 처리기 등록.
    li.addEventListener('click', onTodoElementClicked)
    li.addEventListener('dblclick', onTodoElementDblclicked)
    li.addEventListener('keyup', onTodoElementKeyupped)
    li.innerHTML = newTodoHTMLElement
    todoList.append(li)
    // 만약 해당 할 일이 완료된 할 일이라면 클릭 이벤트를 발생시켜 체크박스를 토글.
    if(todo.isDone){
        todoList.querySelector('li:last-child div input.toggle').dispatchEvent(new Event('click', {bubbles: true}))
    }
    updateCountText()
}

// 할 일을 클릭했을때 이벤트 위임.
function onTodoElementClicked(event){
    if(!event.target){
        return
    }

    if(event.target.nodeName === 'INPUT' &&
       event.target.classList.contains('toggle')){
        toggleTodoElementStatus(event)
    } else if(event.target.nodeName === 'BUTTON'){
        removeCurrentTodoElement(event)
    }
}

// 할 일을 더블클릭했을때 이벤트 위임.
function onTodoElementDblclicked(event){
    if(event.target && event.target.nodeName === 'LABEL'){
        toggleTodoElementMode(event)
    }
}

// 할 일을 조작 중 키를 입력했을때 이벤트 위임.
function onTodoElementKeyupped(event){
    if(event.target && event.target.nodeName === 'INPUT'){
        updateTodoEdit(event)
    }
}


// 할 일 완료 여부 체크/체크 해제 시 속성 부여, 제거 로직.
function toggleTodoElementStatus({ target }){
    // checkbox 타입의 <input>에 checked 속성 부여/해제.
    target.toggleAttribute('checked')
    // 해당 할 일의 <li> 태그에 completed 클래스 부여/해제.
    const todoElementLI = target.closest('li')
    todoElementLI.classList.toggle('completed')
    // 내부 자료구조에서도 checked 속성에 따른 isDone 속성 true/false 전환.
    findTodoElement(todoElementLI.id, 'id').isDone = (target.getAttribute('checked') != null)
    // 내부 자료구조를 localStorage로 업데이트.
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
    // 마찬가지로 현재 필터에 따라 할 일이 출력되거나 숨겨지도록 이벤트 발생.
    // 이 때 직접 발생시킨 이벤트는 버블링 되지 않기 때문에 직접 bubbles 해줘야함!
    document.querySelector('ul.filters li a[class*="selected"').dispatchEvent(new Event('click', {bubbles: true}))
    updateCountText()
}


// 할 일 삭제 이벤트 처리기.
function removeCurrentTodoElement({ target }){
    // 삭제할 할 일의 고유값을 이용해 내부 자료구조에서 제거.    
    todoElementsArray.splice(todoElementsArray.indexOf(findTodoElement(target.closest('li').id, 'id')), 1)
    // 변경된 자료구조를 localStorage에 업데이트. HTML 코드에서도 삭제한 후 카운터 업데이트.
    localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
    target.closest('li').remove()
    updateCountText()
}


// 할 일을 더블클릭 했을 때 편집 모드 토글.
function toggleTodoElementMode({ target }){
    target.closest('li').classList.toggle('editing')
}


// 할 일 변경 이벤트 처리기.
function updateTodoEdit({ target, key }){
    const todoElementLI = target.closest('li')
    // ESC를 눌렀다면 편집 모드 종료, Enter를 눌렀다면 편집 적용.
    if(key === 'Escape'){
        todoElementLI.classList.toggle('editing')
    } else if (key === 'Enter'){
        // 기본적인 입력값 필터링(공백제거, 중복검사).
        const newTodoText = target.value.trimStart().trimEnd()        
        if(newTodoText.length === 0){
            target.focus()
        }
        
        if(checkDuplicates(newTodoText)){
            alert('That ToDo already exists!')
            return
        }

        // 변경 대상 할 일의 고유값을 이용하여 비교하여 내부 자료구조 업데이트.
        findTodoElement(todoElementLI.id, 'id').text = newTodoText
        // 내부 자료구조를 localStorage에도 업데이트.
        localStorage.setItem(KEYWORD, JSON.stringify(todoElementsArray))
        // HTML 요소에서도 변경사항 적용 후 편집모드 종료.
        todoElementLI.querySelector('div label').innerText = newTodoText
        todoElementLI.classList.toggle('editing')
    }
}
