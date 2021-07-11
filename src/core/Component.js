export default class Component {
    $target;
    $props;
    $state;
    constructor($target, $props ) {
        this.$props = $props;
        this.$target = $target;
        this.setup();
        
        this.render();
        this.setEvent();
    }
    setup() { };
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
        const children = [...document.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);
       
        this.$target.addEventListener(eventType, event => {
            if (!isTarget(event.target)) return false;
            callback(event);
        });
    } $ta
  
}