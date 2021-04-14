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
        if(event.key !== 'Enter'){
            return;
        }

        var li = document.createElement('li');

        var viewDiv = document.createElement('div');
        viewDiv.setAttribute('class', 'view');

        var toggleInput = document.createElement('input');
        toggleInput.setAttribute('class', 'toggle');
        toggleInput.setAttribute('type', 'checkbox');

        var label = document.createElement('label');
        label.setAttribute('class', 'label');
        label.innerHTML = newTodoInput.value;

        var destroyButton = document.createElement('button');
        destroyButton.setAttribute('class', 'destroy');

        var editInput = document.createElement('input');
        editInput.setAttribute('class', 'edit');
        editInput.setAttribute('value', newTodoInput.value);

        viewDiv.appendChild(toggleInput);
        viewDiv.appendChild(label);
        viewDiv.appendChild(destroyButton);

        li.appendChild(viewDiv);
        li.appendChild(editInput);

        // todoList > item 추가
        todoList.appendChild(li);

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
        const toggleParentNode = event.target.parentNode;
        const {parentNode} = toggleParentNode;
        if (event.target.checked) {
            parentNode.classList.add('completed');
        } else {
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
                event.target.value = '';
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

        // 선택한 filter에 따른 액션
        switch (true) {
            case event.target.classList.contains('all'):
                console.log('all');
                for (let i = 0; i < todoList.children.length; i++) {
                    todoList.children[i].classList.remove('hidden');
                }
                break;
            case event.target.classList.contains('active'):
                console.log('active');
                for (let i = 0; i < todoList.children.length; i++) {
                    if (todoList.children[i].classList.contains('completed')) {
                        todoList.children[i].classList.add('hidden');
                    } else {
                        todoList.children[i].classList.remove('hidden');
                    }
                }
                break;           
            case event.target.classList.contains('completed'):
                console.log('completed');
                for (let i = 0; i < todoList.children.length; i++) {
                    if (todoList.children[i].classList.contains('completed')) {
                        todoList.children[i].classList.remove('hidden');
                    } else {
                        todoList.children[i].classList.add('hidden');
                    }
                }
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