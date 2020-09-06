import { getFilter, getItems } from './store.js';
import { initRender } from './render.js';

initRender({ todoItems: getItems(), filter: getFilter() });