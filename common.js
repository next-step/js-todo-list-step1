// 할 일들이 저장되는 localStorage의 키워드.
export const KEYWORD = "gTZ5JMw51a" 
// localStorage에 저장된 할 일들(JSON 형식).
export var todoElementsArray = JSON.parse(localStorage.getItem(KEYWORD)) ?? [] 
    /**
     * todoElementsArray: [todoElement1, [todoElement2, ...]]
     * todoElement:
     *     - id: string. unique id of each todo element. attached to <li>
     *     - text: string. text of each todo element. attached to <label> and <input>
     *     - isDone: boolean. completed(or not) status of each todo element.
     */

// 할 일이 몇 개 있는지 출력하는 텍스트(총 n 개)를 업데이트하는 로직.
export function updateCountText(){
    let todoListCountText = document.querySelector('span.todo-count strong')
    let selectedFilter = document.querySelector('ul.filters li a[class*="selected"]')
    let allTodos = document.querySelectorAll('ul.todo-list li')
    let completedTodos = document.querySelectorAll('ul.todo-list li.completed')

    if(selectedFilter.classList.contains('all')){
        todoListCountText.innerText = allTodos.length
    } else if(selectedFilter.classList.contains('active')){
        todoListCountText.innerText = allTodos.length - completedTodos.length
    } else if(selectedFilter.classList.contains('completed')){
        todoListCountText.innerText = completedTodos.length
    }

}