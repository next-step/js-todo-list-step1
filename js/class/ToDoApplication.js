class ToDoApplication{
    constructor(_dom){
        this.toDo = new ToDo();
        this.init(_dom);
    }
    init(_dom){
        this.loadTodos(this.toDo.items);
        this.newTodo(_dom);
    }    
    newTodo(_dom){
        const input = _dom.querySelector('.new-todo');
        input.addEventListener('keydown', (e) =>{
            let keyCode = e.keyCode;
            let todoText = e.target.value;
            keyCode == 13 ? (this.addTodo(todoText), e.target.value = '') : false;
        });
    }
    addTodo(todoText){
        const newItem = this.toDo.addItem(todoText);
        this.appendItem(newItem);
        this.deleteTodoItem();
        this.setComplete();
        this.countToDos();
    }
    loadTodos(toDoItems){
        toDoItems.forEach(this.appendItem);
        this.editingToDos();
        this.deleteTodoItem();
        this.setComplete();
        this.countToDos();
        this.filterToDos();
        
    }
    appendItem(newItem){
        const ulList = document.querySelector('#todo-list');
        let liTemplate = `<li id="${newItem.id}" class="${newItem.isCompleted ? 'completed' : ''}">
                        <div class="view">
                        <input class="toggle" type="checkbox" ${newItem.isCompleted ? "checked" : ''} />
                        <label class="label">${newItem.text}</label>
                        <button class="destroy"></button>
                        </div>
                        <input class="edit" value="${newItem.text}" />
                    </li>`;
        ulList.innerHTML += liTemplate;
    }
    deleteTodoItem(){
        let list = document.querySelector('#todo-list');
        let btn = document.querySelectorAll('.destroy');
        let parent,liId;
        for(let i =0; i < btn.length; i++){
            btn[i].onclick = (e) => {
                parent = e.target.parentNode.parentNode;
                liId = parent.id;
                list.removeChild(parent);
                this.toDo.deleteItem(liId);
                this.countToDos();
            };
        }
        
    }
    setComplete(){
        let checkBoxList = document.querySelectorAll('.toggle');
        checkBoxList.forEach((check) => {
            check.addEventListener('change',(e) => {
                let active = e.target.parentNode.parentNode;
                let activeId = active.id;
                if(e.target.checked){
                    e.target.setAttribute('checked','checked');
                    active.classList.value = 'completed';
                    this.toDo.isCompleted(activeId,true);
                    this.filterToDos();
                }else{
                    e.target.setAttribute('checked',false);
                    active.classList.value = '';
                    this.toDo.isCompleted(activeId,false);
                    this.filterToDos();
                }
            });

        });
    }
    countToDos(){
        let count = this.toDo.items.length;
        let view = document.querySelector('main span.todo-count strong');
        view.innerText = count;
    }
    filterToDos(){
        let alist = document.querySelectorAll('a');
        alist.forEach((filterA) => {
            filterA.addEventListener('click',(e) => {
                let beforeSelected = document.querySelector('.selected');
                beforeSelected.classList.remove('selected');
                filterA.classList.add('selected');
                let filterName = filterA.classList[0];
                let filter;
                if(filterName == 'all'){
                    filter = this.toDo.items;
                }else{
                    filter = this.toDo.filterItem(filterName);
                }
                let list = document.querySelector('#todo-list');
                list.innerHTML = '';
                this.loadTodos(filter);
            });
        });

    }
    editingToDos(){
        let inputList = document.querySelectorAll('li');
        inputList.forEach((li) => {
            li.addEventListener('dblclick',(e) => {
                li.classList.add('editing');
                let activeId = li.id;
                let focuslocation = li.querySelector('input.edit').value.length;
                li.querySelector('input.edit').setSelectionRange(focuslocation, focuslocation);
                li.querySelector('input.edit').focus();
                li.addEventListener('keydown', (e) =>{
                    let keyCode = e.keyCode;
                    let todoText = e.target.value;
                    if(keyCode == 13){
                        this.toDo.updateItem(activeId,todoText);
                        li.classList.remove('editing');
                        e.target.innerText = todoText;
                        li.querySelector('label').innerHTML=todoText;
                    }else if(keyCode == 27){
                        li.classList.remove('editing');
                    }
                });
                
            });
        });

    }
    
    
}