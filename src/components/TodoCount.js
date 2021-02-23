export default function TodoCount({ todoItems }) {
    const $countSpan = document.querySelector('.todo-count');

    this.todoItems = todoItems;

    this.setState = items => {
        this.todoItems = items;
        this.render();
    };

    this.render = () => {
        $countSpan.innerHTML = `총 <strong>${this.todoItems.length}</strong> 개`;
    };

}
