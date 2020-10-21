export function createStore(reducer) {
	let state;
	const listeners = [];

	const publish = () => {
		listeners.forEach(({subscriber, context}) => {
			subscriber.call(context);
		});
	}

	const dispatch = (action) => {
		state = reducer(state, action);
		publish();
	}

	const subscribe = (subscriber, context = null) => {
		listeners.push({
			subscriber,
			context
		});
	}

	const getState = () => ({...state});

	return {
		dispatch,
		getState,
		subscribe,
	}
}

export const actionCreator = (type, payload) => ({
	type,
	payload
})