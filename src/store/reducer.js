import { actionTypes } from '../utils/constants.js';


export default function reducer(state = {}, action) {
    switch(action.type) {
        case actionTypes.ADD:
            let seq;
            if (Object.keys(state).length < 1) {
                seq = 0;
            } else {
                const lastSeq = Object.keys(state).map(v => Number(v)).reduce((a,b) => Math.max(a,b));
                seq = lastSeq +1;
            }
            state[seq] = {
                seq,
                content: action.content
            };
            return state;
        default: 
            return state;
    }
}
