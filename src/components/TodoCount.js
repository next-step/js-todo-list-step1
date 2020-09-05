class TodoCount {
    $target;
    constructor (target, props) {
        this.$target = target;
    }
    render ({todoItems}) {
        const { $target } = this;
        $target.innerHTML = todoItems.length;
    }
}
export default TodoCount;