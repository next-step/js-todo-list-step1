import { getFilter, getItems } from './store.js';
import { initRender } from './render.js';
import './registEvent.js';

initRender({ todoItems: getItems(), filter: getFilter() });
