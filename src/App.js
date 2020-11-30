import store from './store/index.js'; 

import Count from './components/count.js';
import List from './components/list.js';
import Input from './components/input.js';


const countInstance = new Count();
const listInstance = new List();
const InputInstance = new Input();

countInstance.render();
listInstance.render();
InputInstance.render();

