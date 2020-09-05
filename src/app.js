import { store, getItems } from './store.js';
import { initRender } from './render.js';

initRender({ todoItems: getItems(), filter: store.filter });