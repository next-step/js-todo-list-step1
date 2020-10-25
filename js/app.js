import { Head } from './TodoList/head.js';
import { Body } from './TodoList/body.js';
import { Bottom } from './TodoList/bottom.js';
import { Template } from './TodoList/template.js';

console.log('TEST: TodoList init', );

let ID = 0;
class app {
    constructor () {
        this.item = [] // {id, context, complete}, {id: ID++, context: 'test', complete: false}
        console.log('TEST: app.js', this.item, ID);
        this.Head = new Head(this, this.item);
        this.Body = new Body(this, this.item);
        this.Bottom = new Bottom(this, this.item);
        this.Template = Template
        this.$TodoInput = document.getElementById('new-todo-title')
        this.$TodoList = document.getElementById('todo-list')
        // this.render();
    }

    render() {
        /**  body.js로 옮길것  */
        let result = this.item.map(v => Template(v)).join()
        this.$TodoList.innerHTML = '';
        this.$TodoList.insertAdjacentHTML('beforeend', result)
        /** bottom.js로 옮길것  */
    }
    
    addItem (inputValue) {
        let eachItem = {id: ID++, context: inputValue, complete: false}
        console.log('TEST: addItem', eachItem);
        this.item.push(eachItem)
        this.render()
    }
    updateItem () {}
    deleteItem () {}

}

let TodoList = new app();
console.log('TEST: TodoList init done', TodoList);