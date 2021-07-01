import { createStore } from '../core/redux/index.js';
import reducer from './reducer.js';

const store = createStore(reducer);

export { store };
