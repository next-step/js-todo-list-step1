
export function TodoTotalCount( $div, context ){
    const $count = document.querySelector('.todo-count > strong');
    const $filter = $div.querySelector('.filters');


    this.setState = (todoItems) => {
        this.render(todoItems);
    };
    
    this.render = (todoItems) => {
        $count.innerText = todoItems.length;
        $filter.innerHTML = renderHTML();
    };

    $filter.addEventListener('click', e => {
        const completeState = e.target.innerText;
        context.filterTodo(completeState);
    });

    const renderHTML = () => {
        return `<li>
                    <a class="all selected" href="/#">전체보기</a>
                </li>
                <li>
                    <a class="active" href="#active">해야할 일</a>
                </li>
                <li>
                    <a class="completed" href="#completed">완료한 일</a>
                </li>`
    }

}