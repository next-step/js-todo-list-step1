export default class Component{
	$target; $state; $props;

	constructor($target, $props = {}) {
		this.$target = $target;
		this.$props = $props;
		this.init();
		this.setEvent();
		this.render();
	};

	template() {return ``};

	render() {
		this.$state = this.template();
		
		this.mounted();
	};
	setState(newState) {
		this.$state = { ...this.$state, ...newState};

		this.render();
	};
	mounted() {};

	setEvent() {};
	addEvent(eventName, eventTarget, callback) {
		this.$target.addEventListener(eventName, event => {
			const children = [ ...this.$target.querySelectorAll(eventTarget) ];

			if(!children.includes(event.target)) return;

			callback(event);
		});
	};
};