export default class Component{
	$target; $state; $props;

	constructor($target, $props = {}) {
		this.$target = $target;
		this.$props = $props;
		this.init();
		this.setEvent();
		this.render();

		$target.innerHTML = this.$target.innerHTML;

		console.log($target)
	};

	template() {return ``};

	init () {};

	render () {
		this.$target.innerHTML = this.template();

		this.mounted();
	};

	setState(newState) {
		this.$state.todos = newState.todos;

		this.render();
	};
	mounted() {};

	setEvent() {};
	addEvent(eventName, eventTarget, callback) {
		this.$target.addEventListener(eventName, event => {
			const children = [ ...this.$target.querySelectorAll(eventTarget) ];

			if (!children.includes(event.target)) return;

			callback(event);
		});
	};

	objectForEach(object, callback) {
		let index = 0;

		for(let key in object) {
			callback(object[key], index);
			index++;
		}
	};

	getStateValue(object) {
		const arr = [];

		this.objectForEach(object, item => {
			arr.push(item);
		});

		return arr;
	};
};