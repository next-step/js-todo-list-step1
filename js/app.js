// 미션1 새로운 코드
import { todoTrigger } from './todoTrigger.js';
import { todoListRender } from './todoRender.js';

const todoApp = () => {
    todoListRender();
    todoTrigger();
};

window.addEventListener('DOMContentLoaded', () => {
    todoApp();
});
