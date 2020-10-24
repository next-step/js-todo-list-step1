import { Head } from './TodoList/head.js';
import { Body } from './TodoList/body.js';
import { Bottom } from './TodoList/bottom.js';
import { Template } from './TodoList/template.js';

console.log('TEST: TodoList init', );

let ID = 0;
class app {
    constructor () {
        this.item = [{id: ID++, context: 'test', complete: false}] // {id, context, complete}
        console.log('TEST: app.js', this.item, ID);
        this.Head = new Head(this, this.item);
        this.Body = new Body(this, this.item);
        this.Bottom = new Bottom(this, this.item);
        this.Template = Template
        this.$TodoInput = document.getElementById('new-todo-title')
        this.$TodoList = document.getElementById('todo-list')
        this.render();
    }

    render() {
        let result = this.item.map(v => Template(v)).join()
        this.$TodoList.insertAdjacentHTML('beforeend', result)
    }
}

let TodoList = new app();
console.log('TEST: TodoList init done', TodoList);