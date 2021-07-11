export default class Component {
    $target;
    $props;
    $state;
    constructor ($target, $props) {
      this.$target = $target;
      this.$props = $props; 
      this.setup();
      this.setEvent();
      this.render();
    }
    setup () {};
    template () { return ''; }
    render () {
      this.$target.innerHTML = this.template();
      this.mounted();
    }
    setEvent () {}
    mounted(){}
    setState (List) {
        this.$state = List;
        this.render();
    }
  }