window.onload = () => {

    const newTodoInput = document.getElementById('new-todo-title');
    const todoList = document.getElementById('todo-list');
    const totalCount = document
        .getElementsByClassName('todo-count')[0]
        .getElementsByTagName('strong')[0];
    const filters = document.getElementsByClassName('filters')[0];

    // 추가 
    function addTodoList(event) { 
        // 입력값이 엔터일 경우에만
        if(event.key !== 'Enter' || newTodoInput.value == ''){
            return;
        }

        todoList.innerHTML += `
        <li>
            <div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${newTodoInput.value}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${newTodoInput.value}">
        </li>`;

        // 입력 input 비우기
        newTodoInput.value = '';

        // 개수 카운팅
        totalCounting();
    }

    // 개수 카운팅
    function totalCounting() {
        totalCount.innerHTML = todoList.getElementsByTagName('li').length;
    }

    // 체크/삭제
    function clickTodoList(event) {
        const {className} = event.target;

        switch (className) {
            case 'destroy':
                removeTodoList(event);
                break;
            case 'toggle':
                toggleTodoList(event);
                break;
        }
    }

    // 삭제
    function removeTodoList(event) {
        const removeParentNode = event.target.parentNode.parentNode;
        todoList.removeChild(removeParentNode);
        // 개수 카운팅
        totalCounting();
    }

    // 체크
    function toggleTodoList(event) {
        const toggle = event.target;
        const toggleParentNode = event.target.parentNode;
        const {parentNode} = toggleParentNode;
        if (event.target.checked) {
            toggle.setAttribute('checked', true);
            parentNode.classList.add('completed');
        } else {
            toggle.removeAttribute('checked');
            parentNode.classList.remove('completed');
        }
    }

    // 라벨 더블클릭
    function doubleClickTodoList(event) {
        const editedParentNode = event.target.parentNode;
        const {parentNode} = editedParentNode;

        if (event.target.className === 'label') {
            parentNode.classList.add('editing');
        }
    }

    // 라벨 수정 or 나가기
    function editTodoList(event) {
        const {parentNode} = event.target;

        switch (event.key) {
            case 'Escape':
                event.target.value = event.target.closest('li').querySelector('label').innerText;
                parentNode.classList.remove('editing');
                break;
            case 'Enter':
                event.target.closest('li').querySelector('label').innerText = event.target.value;
                parentNode.classList.remove('editing');
                break;
          }
    }

    // 필터 클릭
    function clickFilter(event) {

        // 모든 filter 선택해제 -> 선택한 filter selected 추가
        for(let i = 0; i < filters.children.length; i++) {
            filters.children[i].firstElementChild.classList.remove('selected');
        }
        event.target.classList.add('selected');

        let count = 0;

        // 선택한 filter에 따른 액션
        switch (true) {
            case event.target.classList.contains('all'):
                console.log('all');
                for (let i = 0; i < todoList.children.length; i++) {
                    todoList.children[i].classList.remove('hidden');
                }
                totalCounting();
                break;
            case event.target.classList.contains('active'):
                console.log('active');
                for (let i = 0; i < todoList.children.length; i++) {
                    if (todoList.children[i].classList.contains('completed')) {
                        todoList.children[i].classList.add('hidden');
                    } else {
                        todoList.children[i].classList.remove('hidden');
                        count++;
                    }
                }
                totalCount.innerHTML = count;
                break;           
            case event.target.classList.contains('completed'):
                console.log('completed');
                for (let i = 0; i < todoList.children.length; i++) {
                    if (todoList.children[i].classList.contains('completed')) {
                        todoList.children[i].classList.remove('hidden');
                        count++;
                    } else {
                        todoList.children[i].classList.add('hidden');
                    }
                }
                totalCount.innerHTML = count;
                break;
          }
    }

    // 이벤트
    newTodoInput.addEventListener('keydown', addTodoList); // 추가 입력폼 액션
    todoList.addEventListener('click', clickTodoList); // 완료, 삭제 버튼 클릭
    todoList.addEventListener('dblclick', doubleClickTodoList); // Todo 더블클릭
    todoList.addEventListener("keyup", editTodoList); // 수정 입력폼 액션
    filters.addEventListener("click", clickFilter);

}