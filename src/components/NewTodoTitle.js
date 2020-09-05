class NewTodoTitle {
    $target;
    props;

    constructor(target, props) {
        this.$target = target;
        this.props = props;
        this.setEvent();
    }
    addTodoItem = (contents) => this.props.addTodoItem(contents);

    setEvent() {
        const { $target, addTodoItem } = this;
        $target.addEventListener('keypress', ({ target, key }) => {
            const contents = target.value;
            contents !== '' && key === 'Enter' && addTodoItem(contents);
        });
    }
}
export default NewTodoTitle;