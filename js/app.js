import { TodoInput } from './TodoList/TodoInput.js';
import { TodoList } from './TodoList/TodoList.js';
import { TodoFilter } from './TodoList/TodoFilter.js';
import { Template, TemplateEditing, TemplateCompleted } from './TodoList/Templates.js';

console.log('TEST: TodoList init', );

class App {
    constructor () {
        this.ID = 0;
        this.item = [] // {id, context, complete}, {id: ID++, context: 'test', complete: false}
        this.TodoInput = new TodoInput(this);
        this.TodoList = new TodoList(this);
        this.TodoFilter = new TodoFilter(this);
        this.Template = Template

        // this.$TodoInput = document.getElementById('new-todo-title')
        this.$TodoList = document.getElementById('todo-list')
        this.$TodoCount = document.querySelector('.todo-count strong');
    }

    itemBeforeRender () {
        return this.item.map(todoItem => Template(todoItem))
    }
    render() {
        const result = this.itemBeforeRender().join()
        this.$TodoList.innerHTML = '';
        this.$TodoList.insertAdjacentHTML('beforeend', result)
        this.$TodoCount.innerText = this.itemBeforeRender().length
    }
    
    addItem (inputValue) {
        const eachItem = {id: this.ID++, context: inputValue, complete: false}
        this.item.push(eachItem)
        this.render()
    }
    beforeUpdateItem () {}
    afterUpdateItem (targetElement, value) {
        console.log('TEST: afterUpdateItem', );
        const itemId = targetElement.id.replace('item-', '')
        this.item = this.item.map(todoItem => {
            if ( parseInt(itemId) === todoItem.id) {
                todoItem.context = value
            }
            return todoItem
        })
        this.render();
    }
    deleteItem (targetElement) {
        const itemId = targetElement.id.replace('item-', '')
        this.item = this.item.filter( todoItem =>  (parseInt(itemId) === todoItem.id) ? false : true )
        this.render();
    }
    completeItem (targetElement) {
        // item값 변경 
        const itemId = targetElement.id.replace('item-', '')
        this.item = this.item.map(todoItem => {
            if ( todoItem.id === parseInt(itemId) ) {
                todoItem.complete = !todoItem.complete
            }
            return todoItem
        })
    }
}

const todo = new App();