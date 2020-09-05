class NewTodoTitle {
    $target;
    props;

    constructor(target, props) {
        this.$target = target;
        this.props = props;
        this.setEvent();
    }
    onAdd = (contents) => this.props.onAdd(contents);

    setEvent() {
        const { $target, onAdd } = this;
        $target.addEventListener('keypress', ({ target, key }) => {
            const contents = target.value;
            contents !== '' && key === 'Enter' && onAdd(contents);
        });
    }
}
export default NewTodoTitle;