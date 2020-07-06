export default function ({ observable, renderer }) {
	return new Proxy(observable, {
		get(observable, prop) {
			return observable[prop];
		},
		set(observable, prop, value) {
			observable[prop] = value;

			renderer(prop[value]);

			return true;
		},
	});
}
