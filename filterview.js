import {updateCountText} from './common.js'

let filters = document.querySelector('ul.filters')
let filterAll = filters.querySelector('li a.all')
let filterActive = filters.querySelector('li a.active')
let filterCompleted = filters.querySelector('li a.completed')
let selectedFilter = filterAll

// 각 필터를 변수로 저장 후 초기화. 필터 모음에는 이벤트 위임 설정.
export function initFilters(){
    filters.addEventListener('click', filterViewChange)
}

// 선택한 필터가 변경되었을 때 사용자에게 보이는 할 일들을 업데이트.
export function filterViewChange({ target }){
    let todoList = document.getElementById('todo-list') 
    // 필터(<a>)를 클릭했을때만 이벤트 처리.
    if(!target || target.nodeName != 'A'){
        return
    } 

    // 할 일들의 갯수와 엘리먼트 리스트(children)를 변수에 저장.
    let todoListCount = todoList.querySelectorAll('li').length
    let todoElements = todoList.children
    
    // 현재 선택된 필터에서 selected 클래스 제거.
    selectedFilter.classList.remove('selected')
    // 이후 현재 선택된 필터에 따라 선택된 필터를 저장하는 변수 업데이트, 해당하는 할 일 display 속성 변경.
    if(target.classList.contains('all')){
        selectedFilter = filterAll
        for(let index=0;index<todoListCount;index++){
            todoElements[index].style.display = ""
        }
    } else if(target.classList.contains('active')){
        selectedFilter = filterActive
        for(let index=0;index<todoListCount;index++){
            todoElements[index].style.display = todoElements[index].querySelector('div input').getAttribute('checked') === null ? "" : "none"
        }
    } else if(target.classList.contains('completed')){
        selectedFilter = filterCompleted
        for(let index=0;index<todoListCount;index++){
            todoElements[index].style.display = todoElements[index].querySelector('div input').getAttribute('checked') === null ? "none" : ""
        }
    }
    // 새로 선택된 필터에 selected 클래스 추가 후 카운터 업데이트.
    selectedFilter.classList.add('selected')
    updateCountText()
}