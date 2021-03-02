{
    const newTodoTitle = document.querySelector("#new-todo-title");
    const todoList = document.querySelector('#todo-list');
    const countContainer = document.querySelector(".count-container");
    const todoCount = countContainer.querySelector(".todo-count strong");
    const filters = countContainer.querySelector(".filters");
    showTodoCount();

    // list object
    const TITLES = "titles";
    let title_list = [];
    let id = 0;

    function updateLocalStorage(){
        localStorage.setItem(TITLES, JSON.stringify(title_list));
    }

    
    function addNewTodo(title){
        todoList.innerHTML += `  
        <li>
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${title}" />
        </li>
        `;

        const titleObj = {
            text : title,
            id : id++,
            state:"active",
        }
        console.log(titleObj);

        title_list.push(titleObj);
        updateLocalStorage();
        showTodoCount();
    }

    function controlTitleStatus(target){
        const li = target.parentNode.parentNode;
        target.classList.toggle("completed");
        li.classList.toggle("completed");

    }

    function deleteTitle(target){
        const li = target.parentNode.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
        showTodoCount();
    }

    function handleListClick(e){
        const target = e.target;
        switch(target.nodeName){
            case 'INPUT':
                controlTitleStatus(target);
                break;
            case 'BUTTON':
                deleteTitle(target);
                break;
            default:
                break;
        }
    }

    function handleTitleKeyup(e){
        if(e.keyCode === 13){
            const editInput = e.target;
            const li = editInput.parentNode;
            const label = li.querySelector('.label');
            li.classList.remove('editing');  
            label.innerHTML = editInput.value;

        }else if(e.keyCode === 27){
            const li = e.target.parentNode;
            li.classList.remove('editing');    
            console.log(li);
        }
    }

    function handleListDblClick(e){
        const target = e.target;
        if(!target.nodeName === 'LABEL'){
            return;
        }

        const li = target.parentNode.parentNode;
        li.classList.add('editing');

        console.log(target);
    }

    function submitTodo(e){
        if(e.keyCode === 13){ //enter key
            e.preventDefault();
            addNewTodo(newTodoTitle.value);
            newTodoTitle.value = '';
        }
    }

    function showTodoCount(){
        todoCount.innerHTML = todoList.childElementCount;
    }

    function handleFilterClick(e){
        const target = e.target;
        if(!target.nodeName === 'A'){
            return;
        }

        const btns = filters.querySelectorAll('a');
        console.log(btns);
        btns.forEach((btn)=>{
            btn.classList.remove('selected');
        })
        target.classList.add('selected');

        if(target.classList.contains('all')){
            const titles = todoList.querySelectorAll('li');
            titles.forEach((title)=>{
                title.classList.remove('hidden');
            })
        }else if(target.classList.contains('active')){
            const titles = todoList.querySelectorAll('li');
            titles.forEach((title)=>{
                if(title.classList.contains('completed')){
                    title.classList.add('hidden');
                }else{
                    title.classList.remove('hidden');
                }
            })
        }else if(target.classList.contains('completed')){
            const titles = todoList.querySelectorAll('li');
            titles.forEach((title)=>{
                if(title.classList.contains('completed')){
                    title.classList.remove('hidden');
                }else{
                    console.log('really?');
                    title.classList.add('hidden');
                }
            })
        }
    }

    function loadTitles(){
        const loadedTitles = localStorage.getItem(TITLES);
        const parsedTitles = JSON.parse(loadedTitles);
        parsedTitles.forEach((title)=>{
            console.log(title.text);
            addNewTodo(title.text);
        });
    }

    function init(){
        if(localStorage.getItem(TITLES)){
            loadTitles();
        }
    }

    init();

    todoList.addEventListener("dblclick",handleListDblClick);
    todoList.addEventListener("keyup",handleTitleKeyup);
    todoList.addEventListener("click",handleListClick);
    newTodoTitle.addEventListener("keyup",submitTodo);
    filters.addEventListener('click',handleFilterClick);
}