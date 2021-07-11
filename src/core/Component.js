class Component{
    $target;
    $props;
    $state;
    constructor(target, props) {
        this.$props = props;
        this.$target = target;
    }
    setup() { };
    render() { };
    mounted() { };
    template() { return ``; }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
    }
    setEvent() { };
    setState(newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
    addEvent(eventType, selector, callback) {
        
    }
}