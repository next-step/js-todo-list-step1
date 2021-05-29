import render from './components/render.js';
import './utils/addEvent.js';
import { getTodoItem, getItemFilter } from './store/store.js';
// 초기 렌더링
render({ todoItem: getTodoItem(), option: getItemFilter() });
