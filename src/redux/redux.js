export const createStore = (reducer) => {
    let state;
    const listeners = [];

    const getState = () => ({ ...state });

    const dispatch = (action) => {
        state = reducer(state, action);
        publish();
    };

    const publish = () => {
        listeners.forEach(({subscriber, context}) => {
            subscriber.call(context);
        });
    };

    const subscribe = (subscriber, context = null) => {
        listeners.push({
            subscriber,
            context,
        });
    };

    return {
        getState,
        dispatch,
        subscribe,
    };
};

export const createAction = (type, payload = {}) => ({
    type,
    payload: { ...payload },
});