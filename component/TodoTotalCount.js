
export function TodoTotalCount( $div, context ){
    const $count = document.querySelector('.todo-count > strong');
    const $filter = $div.querySelector('.filters');


    this.setState = (todoItems, filter) => {
        this.render(todoItems, filter);
    };
    
    this.render = (todoItems, filter) => {
        $count.innerText = todoItems.length;
        $filter.innerHTML = renderHTML(filter);
    };

    $filter.addEventListener('click', e => context.filterTodo(e.target.classList.value));

    const renderHTML = (filter) => {
        return `<li>
                    <a class="${filter === '전체보기' ? 'all selected' : 'all'}" href="#">전체보기</a>
                </li>
                <li>
                    <a class="${filter === '해야할 일' ? 'active selected' : 'active'}" href="#active">해야할 일</a>
                </li>
                <li>
                    <a class="${filter === '완료한 일'? 'completed selected' : 'completed'}" href="#completed">완료한 일</a>
                </li>`
    }

}