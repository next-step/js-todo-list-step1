export default class TodoCount {
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
    }
    template() {
        const count = this.$props;
        `
            총 <strong>${count}</strong>개
        `;
    }
}
