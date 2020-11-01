import { TodoInput } from './TodoList/TodoInput.js';
import { TodoList } from './TodoList/TodoList.js';
import { TodoFilter } from './TodoList/TodoFilter.js';
import { Template, TemplateEditing, TemplateCompleted } from './TodoList/Templates.js';

class App {
    constructor () {
        this.ID = 0;
        this.STATUS = '';
        this.item = [] // {id, context, complete}, {id: ID++, context: 'test', complete: false}
        this.TodoInput = new TodoInput(this);
        this.TodoList = new TodoList(this);
        this.TodoFilter = new TodoFilter(this);
        this.Template = Template

        this.$TodoList = document.getElementById('todo-list')
        this.$TodoCount = document.querySelector('.todo-count strong');
    }

    itemBeforeRender (renderItem) {
        return renderItem.map(todoItem => {
            switch (todoItem.complete) {
                case true :
                    return TemplateCompleted(todoItem)
                case false :
                    return Template(todoItem)
            }
        })
    }
    render(status) {
        // 현재의 status값을 찾아서 사용해야 함. 
        const targetItem = this.item.filter(todoItem => {
            if (this.STATUS === '' ) return true;
            if (this.STATUS === 'active' && !todoItem.complete) return true
            if (this.STATUS === 'completed' && todoItem.complete) return true
        })

        const resultList = this.itemBeforeRender(targetItem)
        const resultLength = resultList.length
        const resultHTML = resultList.join()
        this.$TodoList.innerHTML = '';
        this.$TodoList.insertAdjacentHTML('beforeend', resultHTML)
        this.$TodoCount.innerText = resultLength;
    }
    
    addItem (inputValue) {
        const eachItem = {id: this.ID++, context: inputValue, complete: false}
        this.item.push(eachItem)
        this.render()
    }
    afterUpdateItem (targetElement, value) {
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
        this.render()
    }
    changeStatus (status = '') {
        this.STATUS = status
        this.render();
    }
}

const todo = new App();