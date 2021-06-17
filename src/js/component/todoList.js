export default class TodoList {
    $target;
    $props;
    $todoList;
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
         console.log(this.$props);
        this.render();
    }

    template() {
        const checked = 'checked';
        const todolist = this.$props.list;
        console.log(todolist);

        return `
        ${this.$props.list.map(
                ({ id, content, complete }) => `
        <li id="todo_${id}" class = ${complete ? 'complete' : ' '}> 
            <div class="view">
            <input id="input_${id}" class="toggle" type="checkbox" ${complete ? checked : ''}/>
            <label class="label">${content}</label>
            <button class="destroy" id="destory_${id}"></button>
            </div>
            <input id="edit_${id}" class="edit" value="${content}" />
        `
            )
            .join('')}
        </li>
        `;
    }

    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }

    mounted() {
        let that = this;
        const label = document.querySelectorAll('.label');
        label.forEach((dom) => dom.addEventListener('dblclick', this.onEdit));

        const editInputs = document.querySelectorAll('.edit');
        editInputs.forEach((editInput) => editInput.addEventListener('keydown', this.editKey.bind(this)));

        const deleteButtons = document.querySelectorAll(".destroy");
        deleteButtons.forEach(deleteButton => deleteButton.addEventListener("click",this.deleteItem.bind(this)));
        
        const checkInputs = document.querySelectorAll(".toggle");
        checkInputs.forEach(checkInput => checkInput.addEventListener("click",this.checkItem.bind(this)));
    }

    onEdit() {
        const _edit = document.querySelectorAll('.todo-list > li');
        _edit.forEach((li) => {
            li.classList.remove('editing');
        });
        this.parentNode.parentNode.classList.add('editing');
    }

    editKey(event) {
        if (event.key == 'Enter') {
            const id = event.target.id.replace('edit_', '');
            const content = event.target.value;
            this.$props.onupdateItem(id, content);
        }
        if (event.key == 'Escape') {
            event.target.parentNode.classList.remove('editing');
        }
    }
    deleteItem(event){
        this.$props.ondeleteItem(event.target.id.replace('destory_',''));
    }

    checkItem(event){
        event.stopPropagation();
        console.log(event.target.id.replace('input_',''))
        this.$props.ontoggleItem(event.target.id.replace('input_',''));
    }
}
