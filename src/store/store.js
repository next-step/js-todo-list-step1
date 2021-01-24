let state = {};

export default function createStore(reducer) {
    
    const dispatch = (action) => {
        state = reducer(state, action);
    }

    const getState = () => ({...state});

    return {
        getState,
        dispatch
    }
};
