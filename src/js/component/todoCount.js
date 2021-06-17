export default class TodoCount {
    $target
    $props
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.render();
    }
    render(){
        const count = this.$props;
        this.$target.innerHTML = `총 <strong>${this.$props}</strong>개`;
    }

}
