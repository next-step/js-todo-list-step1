export class Component {
    $target;
    $props = {};
    $state = {};
    $render;

    constructor(target, props = {}, state = {}) {
        this.$target = target;
        this.$props = props;
        this.$state = state;

        this.$render = () => {
            target.innerHTML = this.render();
        };

        this.setState(state);
        this.setEvent(target);
    }

    setState(state) {
        this.$state = {...this.$state, ...state};
        this.$render();
    }

    setEvent(target) {

    }

    render() {

    }
};