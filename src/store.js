class Store {
    constructor(initialState = {}) {
        this._state = initialState;
        this._events = new Map();
        this._guard = false;
        this._currTicklisteners = new Set();
    }

    on(props, listener) {
        if (!Array.isArray(props)) {
            props = [props];
        }
        props.forEach(prop => {
            if (!this._events.has(prop)) { this._events.set(prop, []) }
            this._events.get(prop).push(listener);
        })
        return props;
    }

    onAndSync(props, listener) {
        props = this.on(props, listener);
        this._deferredUpdate(props, this._state, this._state);
    }

    get() {
        return this._state;
    }

    set(state) {
        const prevState = { ...this._state };
        const nextState = { ...this._state, ...state };

        const changedProps = Array.from(this._events.keys()).filter(prop => {
            const prevValue = this._getValue(prevState, prop);
            const nextValue = this._getValue(nextState, prop);
            const isChanged = prevValue !== nextValue;
            return isChanged;
        })

        if (changedProps.length >= 1) {
            this._deferredUpdate(changedProps, nextState, prevState);
        }
    }

    _getValue(state, prop) {
        return prop.split('.').reduce((v, key) => v[key], state);
    }

    _deferredUpdate(props, nextState, prevState) {
        this._state = nextState;
        props.forEach(prop => {
            Array.from(this._events.get(prop).values()).forEach(listener => {
                this._currTicklisteners.add(listener);
            })
        })
        if (!this._guard) {
            this._guard = true;
            Promise.resolve().then(() => {
                this._guard = false;
                const nextState = this._state;
                this._currTicklisteners.forEach(listener => listener(nextState, prevState));
                this._currTicklisteners.clear();
            })
        }
    }
}

export default Store
