import PubSub from '../lib/pubsub.js';

export default class Store {
    constructor (params) {
        let self = this;

        this.actions = {}
        this.mutations = {}
        this.state = {}
        this.status = 'resting'
        this.events = new PubSub()

        if (params.hasOwnProperty('actions')) {
            this.actions = params.actions
        }
        if (params.hasOwnProperty('mutations')) {
            this.mutations = params.mutations
        }

        self.state = new Proxy((params.state || {}), {
            set: function (state, key, value) {
                state[key] = value
                console.log('stateChange ', key, value)
                self.events.publish('stateChange', self.state)

                if (self.status !== 'mutation') {
                    console.error('You should use a muatation')
                }

                self.status = 'resting'
                
                return true
            }
        })
    }

    dispatch (actionKey, payload) {
        let self = this;

        if (typeof self.actions[actionKey] !== 'function') {
            console.error(`Action ${actionKey} doesn't exist`)
            return false
        }
        console.groupCollapsed(`Action ${actionKey}`)

        self.status = 'action'
        self.actions[actionKey](self, payload)

        console.groupEnd()

        return true;
    }

    commit(mutationKey, payload) {
        let self = this;

        if (typeof self.mutations[mutationKey] !== 'function') {
            console.error(`Mutation ${mutationKey} doesn't exist`)
            return false
        }

        console.groupCollapsed(`Commit ${mutationKey}`)

        self.status = 'mutation'
        let newState = self.mutations[mutationKey](self.state, payload)
        console.group(newState)
        self.state = Object.assign(self.state, newState)

        console.groupEnd()

        return true
    }
}