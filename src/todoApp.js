import TodoContainer from "./components/TodoContainer.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import {$} from "./components/utils.js";
import Component from "./core/Component.js";


export default class todoApp extends Component { //객체 생성 함수
    
    setup() {
        this.$state = {
            todoItems: [
                {
                    id: 1,
                    content: 'item1',
                    isComplete: false
                }
            ],
            selectedItem: -1,
            isFilter: 0
        }
    }
    template() {
        return `
        <h1>TODOS</h1>
        <input
          id="new-todo-title"
          class="new-todo"
          placeholder="할일을 추가해주세요"
          autofocus
        />
        <main>
          <input class="toggle-all" type="checkbox" />
          <ul id="todo-list" class="todo-list"></ul>
          <div class="count-container">
          </div>
        </main>`;
    }


    
    mounted() {
        const { selectedItem, filteredItems, addItem, editItem, toggleItem, deleteItem, itemCount, updateItem, filterItem, resetItem } = this;
        
        const $todoInput = $("#new-todo-title");
        const $todoList = $(".todo-list");
        const $todoCount = $(".count-container");
        

        new TodoInput($todoInput, {
            addItem: addItem.bind(this)
        });
        new TodoList($todoList, {
            filteredItems,
            selectedItem,
            editItem: editItem.bind(this),
            toggleItem: toggleItem.bind(this),
            deleteItem: deleteItem.bind(this),
            updateItem: updateItem.bind(this),
            resetItem: resetItem.bind(this),
            
        });
        new TodoContainer($todoCount, { //todocount와 filter를 가지는 컨테이너
            itemCount,
            filterItem: filterItem.bind(this)
        });
    }
    get filteredItems() {
        const { isFilter, todoItems } = this.$state;
        return todoItems.filter(({ isComplete }) => (isFilter === 1 && isComplete) ||
            (isFilter === 2 && !isComplete) ||
            (isFilter === 0));
    }
    get selectedItem() {
        const { selectedItem } = this.$state;
        return selectedItem;
    }
    
    addItem(content) {
        const { todoItems } = this.$state;
        const id = Math.max(0, ...todoItems.map(v => v.id)) + 1;
        const isComplete = false;
        this.setState({
            todoItems: [
            ...todoItems,
            { id, content, isComplete }
            ]
        });
    }
    updateItem(contents) {
        const { todoItems, selectedItem } = this.$state;
        todoItems[selectedItem].content = contents;
        this.setState({ todoItems, selectedItem:-1})
    }

    editItem(id) {
        this.setState({ selectedItem: id });
    }
    toggleItem(id) {
        const { todoItems } = this.$state;
        const key = todoItems.findIndex(item => item.id === id);
        todoItems[key].isComplete = !todoItems[key].isComplete
        this.setState({ todoItems });
    }
    deleteItem(id) {
        const { todoItems } = this.$state;
        todoItems.splice(todoItems.findIndex(item => item.id === id), 1);
        this.setState({ todoItems });
    }
    filterItem(isFilter) {
        this.setState({ isFilter });
    }
    resetItem() {
        this.setState({ selectedItem: -1 });
    }
    get itemCount() {
        const { todoItems } = this.$state;
        return todoItems.length;
    }
}



