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
        this.$TodoCount = document.querySelector('.todo-count strong');
        // this.render();
    }

    itemBeforeRender () {
        return this.item.map(v => Template(v))
    }
    render() {
        /** 아이템 조작하는 로직 작성 */
        /**  body.js로 옮길것  */
        let result = this.itemBeforeRender().join()
        this.$TodoList.innerHTML = '';
        this.$TodoList.insertAdjacentHTML('beforeend', result)
        /** bottom.js로 옮길것  */
        this.$TodoCount.innerText = this.itemBeforeRender().length
    }
    
    addItem (inputValue) {
        let eachItem = {id: ID++, context: inputValue, complete: false}
        console.log('TEST: addItem', eachItem);
        this.item.push(eachItem)
        this.render()
    }
    updateItem () {}
    deleteItem () {}
    completeItem (targetElement) {
        // item값 변경 
        let itemId = targetElement.id.replace('item-', '')
        console.log('TEST: completeItem enter', itemId, targetElement);
        this.item = this.item.map(v => {
            console.log('TEST: completeItem map', v);
            if ( v.id === parseInt(itemId) ) {
                v.complete = !v.complete
            }
            return v
        })
    }
}

let TodoList = new app();
console.log('TEST: TodoList init done', TodoList);