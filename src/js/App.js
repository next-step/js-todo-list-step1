import TodoCount from './component/todoCount.js';
import TodoInput from './component/todoInput.js';
import TodoList from './component/todoList.js';
import TodoFilter from './component/todoFilter.js';

export default class App {
    list;
    count;
    storage;
    filter;
    constructor($target) {
        this.storage = window.localStorage;
        this.$target = $target;
        this.filter ='all';
        console.log(this.$target);
        this.setup();
    }

    setup() {
        if (this.storage.getItem('list') !== null) {
            this.list = JSON.parse(this.storage.getItem('list'));
        } else {
            this.list = [];
        }
        console.log(this.list);
        if (this.storage.getItem('size') == null) {
            this.storage.setItem('size', 0);
        }
        this.count = Number.parseInt(this.storage.getItem('size'));
        this.mounted();
    }
    template() {
        return ``;
    }

    mounted() {
        const { onkeydown, onupdateItem, list, ondeleteItem, ontoggleItem, onfilterItem } = this;
        new TodoInput(document.querySelector('.new-todo'), {
            onkeydown: onkeydown.bind(this),
        });
        new TodoList(document.querySelector('#todo-list'), {
            onupdateItem : onupdateItem.bind(this),
            list,
            ondeleteItem : ondeleteItem.bind(this),
            ontoggleItem : ontoggleItem.bind(this),
        });
        new TodoCount(document.querySelector('.todo-count'), list.length);
        new TodoFilter(document.querySelector('.filters'), {
            onfilterItem : onfilterItem.bind(this),
            filterMode : this.filter,
        });
    }

    setState(newState) {
        const {onupdateItem,ondeleteItem, ontoggleItem, onfilterItem } = this;
        const list = [...newState];
        new TodoList(document.querySelector('#todo-list'), {
            onupdateItem : onupdateItem.bind(this),
            list,
            ondeleteItem : ondeleteItem.bind(this),
            ontoggleItem : ontoggleItem.bind(this),
        });
        new TodoCount(document.querySelector('.todo-count'), newState.length);
        new TodoFilter(document.querySelector('.filters'), {
            onfilterItem : onfilterItem.bind(this),
            filterMode : this.filter,
        });
    }

    onkeydown(content) {
        const id = this.count + 1;
        const complete = false;
        this.list = [...this.list, { id, content, complete }];
        this.count++;
        this.storage.setItem('list', JSON.stringify(this.list));
        this.storage.setItem('size', id);
        this.setState(this.list);
        this.filter ='all';
    }

    onupdateItem(id, content) {
        this.list.forEach((item) => {
            if (item.id == id) {
                item.content = content;
            }
        });
        this.storage.setItem('list', JSON.stringify(this.list));
       this.setState(this.list);
    }

    ondeleteItem(id){
        this.list=this.list.filter(item => item.id!=id);
        this.storage.setItem('list', JSON.stringify(this.list));
        this.setState(this.list)
    }

    ontoggleItem(id){
        this.list.forEach((item) =>{
            if(item.id == id){
                item.complete = !item.complete;
            }
        });
        this.storage.setItem('list', JSON.stringify(this.list));
        this.setState(this.list);
    }
    onfilterItem(isactive){
        let FILTER = isactive;
        let filterList = this.list;
        switch(FILTER){          
            case 'active' :
                this.filter = 'active'
                this.setState(filterList.filter(item => item.complete==false));
                console.log(filterList.filter(item => item.complete==false))
                break;
            case 'completed' :
                this.filter = 'completed'
                this.setState(filterList.filter(item => item.complete==true));
                break;
            case 'all' :
                this.filter = 'all'
                this.setState(filterList);
                break;
        }
    }
}



new App(document.querySelector('.todoapp'));




// function showListCount(){
//     const str = document.getElementById("strong");
//     str.innerHTML = todoList.length;
// }

// function showActive(){
//     const list = document.getElementById("todo-list").childNodes;
//     const buttons = document.querySelectorAll('a');
//     buttons.forEach(b =>b.style.border ="none");

//     const activeButton = document.querySelector('a.active');
//     activeButton.style.removeProperty('border');
//     activeButton.style.borderColor = "rgba(175, 47, 47, 0.2)";

//     list.forEach(i =>
//         {
//         if(i.classList.value){
//             i.style.display = 'none';
//         }else{
//             i.style.display = '';
//         }
//     });
// }

// function showCompleted(){
//     const list = document.getElementById("todo-list").childNodes;
//     const buttons = document.querySelectorAll('a');
//     buttons.forEach(b =>b.style.border ="none");

//     const completedButton = document.querySelector('a.completed');
//     completedButton.style.removeProperty('border');
//     completedButton.style.borderColor = "rgba(175, 47, 47, 0.2)";

//     list.forEach( i =>
//         {
//         if(!i.classList.value){
//             i.style.display = 'none';
//         }else
//         {
//             i.style.display = '';
//         }
//     });
// }

// function showAll(){
//     const buttons = document.querySelectorAll('a');
//     buttons.forEach(b =>b.style.border ="none");

//     const allButton = document.querySelector('a.selected');
//     allButton.style.removeProperty('border');
//     allButton.style.borderColor = "rgba(175, 47, 47, 0.2)";

//     const list = document.getElementById("todo-list").childNodes;
//     list.forEach( i => i.style.display='');
// }
