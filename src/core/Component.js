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

	init() {};

	render () {
		this.$target.innerHTML = this.template();

		this.mounted();
	};

	setState(newState) {
		console.log(this.$state.todos)
		this.$state.todos = newState.todos;

		this.render();
	};
	mounted() {};

	setEvent() {};
	addEvent(eventName, eventTarget, callback) {
		this.$target.addEventListener(eventName, event => {
			console.log(eventTarget);

			const children = [ ...this.$target.querySelectorAll(eventTarget) ];

			console.log(children);

			if (!children.includes(event.target)) return;

			callback(event);
		});
	};
};