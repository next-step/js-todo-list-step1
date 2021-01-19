import Storage from "../utils/Storage.js";

export const createStore = (reducer) => {
    let state = Storage.getItem("state");
    const listeners = [];

    const getState = () => ({ ...state });

    const dispatch = (action) => {
        state = reducer(state, action);
        Storage.setItem("state", state);
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