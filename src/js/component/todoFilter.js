export default class TodoFilter {
    $target;
    $props;
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.render();
    }
    template() {
        return `
        <li>
            <a id="all" class="selected" href="/#">전체보기</a>
        </li>
        <li>
            <a id="active" href="#active">해야할 일</a>
        </li>
        <li>
            <a id="completed" href="#completed">완료한 일</a>
        </li>
        `;
    }
    render() {
        console.log(this.$target);
        console.log(this.template());
        this.$target.innerHTML = this.template();
    }
}
