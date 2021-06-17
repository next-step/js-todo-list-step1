export default class TodoList {
    $target;
    $props;
    $todoList;
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        //this.$todoList = this;
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
            <button class="destroy"></button>
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
    }
    onEdit() {
        const _edit = document.querySelectorAll('.todo-list > li');
        console.log('dsfsd' + _edit);
        _edit.forEach((li) => {
            li.classList.remove('editing');
        });
        this.parentNode.parentNode.classList.add('editing');
    }
    editKey(event) {
        console.log(event);
        console.log(this);
        if (event.key == 'Enter') {
            console.log('1111111111');
            const id = event.target.id.replace('edit_', '');
            const content = event.target.value;
            console.log(id + ' ' + content);
            this.$props.onupdateItem(id, content);
            //this.render();
        }
        if (event.key == 'Escape') {
            event.target.parentNode.classList.remove('editing');
        }
    }
}
