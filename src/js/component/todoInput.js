export default class TodoInput {
    $target;
    $props;
    $state;
    constructor($target, $props) {
        this.$props = $props;
        this.$target = $target;
        //console.log(typeof onkeydown);
        this.setEvent();
    }

    setEvent() {
        const { onkeydown } = this.$props;
        this.$target.addEventListener('keydown', (event) => {
            if (event.key == 'Enter') {
                if (this.$target.value.trim()) {
                    onkeydown(this.$target.value);
                    console.log(this + 'TodoInput');
                }
            }
        });
    }
}
