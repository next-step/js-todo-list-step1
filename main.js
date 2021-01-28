import { App } from './src/App.js';

let app = new App({});

window.onload = () => {
    const localStorageItem = localStorage.getItem('todoList') ?? '[]';
    app.todoList = JSON.parse(localStorageItem);
    localStorageItem = localStorage.getItem('todoComplete') ?? '[]';
    app.todoComplete = JSON.parse(localStorageItem);

    app.render();
}