export default class Utils {
	static getStorageItem(key) {
		const data = window.localStorage.getItem(key);
		if (typeof data === 'string') {
			try {
				return JSON.parse(data);
			} catch (e) {
			}
		}
		return data;
	}

	static setStorageItem(key, data) {
		let stringify;
		if (typeof data === 'object') {
			stringify = JSON.stringify(data);
		} else {
			stringify = data;
		}
		window.localStorage.setItem(key, stringify);
	}

	static todoListFilter(list, filter) {
		return list.filter(todo => {
			switch (filter) {
				case 'completed':
					return todo.done;
				case 'active':
					return !todo.done;
				default:
					return true;
			}
		})
	}
}