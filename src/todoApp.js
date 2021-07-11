import TodoContainer from "./components/TodoContainer.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";
import $ from "./components/utils.js";
import Component from "./core/Component.js";


export default class todoApp extends Component { //객체 생성 함수
    
    setup() {
        this.$state = {
            todoItems: [
                {
                    id: 1,
                    content: 'item1',
                    isComplete: False
                }
            ],
            selectedItem: -1,
            isFilter: 0
        }
    }
    template() {
        return `
        <div class="todoapp">
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
        </main>
      </div>`
    }


    
    mounted() {
        const { filteredItems, addItem, editItem, toggleItem, deleteItem, countItem } = this;
        $todoInput = $(".new-todo");
        $todoList = $(".todo-list");
        $todoCount = $(".count-container");
        $filter = $(".filters")

        new TodoInput($todoInput, {
            addItem: addItem.bind(this)
        });
        new TodoList($todoList, {
            filteredItems,
            editItem: editItem.bind(this),
            toggleItem: toggleItem.bind(this),
            deleteItem: deleteItem.bind(this)
        });
        new TodoContainer($todoCount, { //todocount와 filter를 가지는 컨테이너
            countItem,
            filterItem: filterItem.bind(this)
        });
    }
    get FilteredItem() {
        const { isFilter, todoItems } = this.$state;
        return todoItems.filter(({ isComplete }) => isFilter === 1 && isComplete ||
            isFilter === 2 && !isComplete ||
            isFilter === 0);
    }
            


    savedState = localStorage.getItem('$state');
    
    addItem(contents) {
        const { todoItems } = this.$state;
        const id = Math.max(0, ...todoItems.map(v => v.id) + 1);
        const isComplete = false;
        this.setState({ id, contents, isComplete });
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
    get countItem() {
        const { todoItems } = this.$state;
        return todoItems.length;
    }
}



