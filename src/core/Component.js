export default class Component{
	$target; $state; $props;

	constructor($target, $props = {}) {
		this.$target = $target;
		this.$props = $props;
		this.init();
		this.setEvent();
		this.render();

		return this;
	};

	template() {return ``};

	init () {};
	render() {};
	mounted() {};
	setEvent() {};

	setState(newState) {
		if(newState?.todos) this.$state.todos = newState?.todos;
		if(newState?.filterType) this.$state.filterType = newState?.filterType;

		this.render();
	};

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
	
	getStateTodoCount() {
		const type = this.$state.filterType.filterType;

		let count = 0;

		if(type === "all") return Object.keys(this.$state.todos).length;
		if(type === "active") {
			this.objectForEach(this.$state.todos, item => {
				if(item.active === false) count++;
			});
		};
		if(type === "completed") {
			this.objectForEach(this.$state.todos, item => {
				if(item.active === true) count++;
			});
		};

		return count;
	};
};