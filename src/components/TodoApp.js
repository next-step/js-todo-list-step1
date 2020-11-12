import DynamicDom from "../core/DynamicDom.js";
import { app, todoState, todoStore } from "../index.js";
import { 
  deleteTodo,
  toggleTodoState,
  updateTodoTitle 
} from "../store/index.js";

function updateTodo(title, id) {
  todoStore.dispatch(updateTodoTitle(id, title));
}

function todoToggle(id) {
  todoStore.dispatch(toggleTodoState(id));
}
 
function TodoView({todo, key}) {
  return DynamicDom.createElement(
    "div", 
    {
      className: "view",
      id: todo.id
    }, 
    TodoToggle({todo}),
    TodoTitle({todo, key}),
    TodoButton({id: todo.id})
  )
}

function TodoInput({todo, key}) {

  const { setState } = todoState;

  return DynamicDom.createElement("input",{
    className: "edit",
    value: todo.title,
    type: "text",
    onDblclick: () => {
      setState(key, 
        {
          data: "", 
          props: {
            key,
            stateId:todo.id
        }});
    },
    onKeypress: (e)=>{
      if(e.keyCode === 13) {
        updateTodo(e.target.value, todo.id)
        setState(key, 
          {
            data: "", 
            props: {
              key,
              stateId: todo.id
          }});
      }
    }
  }, "")
}

function TodoToggle({todo}) {

  return DynamicDom.createElement("input", {
    className: "toggle",
    type: "checkbox",
    checked: todo.state === "completed" ? true : false,
    onClick: ()=> {
      todoToggle(todo.id)
    }
  }, "")
}

function TodoTitle({todo, key}) {

  const { setState } = todoState;

  return DynamicDom.createElement("label", {
    onDblclick: () => {
      setState(key, 
        { 
          data:"editing", 
          props: {
            key,
            stateId: todo.id
        }});
    }
  }, `${todo.title}`)
}

function TodoButton({id}) {
  return DynamicDom.createElement("button", {
    className: "destroy",
    id: id,
    onClick: (e) => {
      if(window.confirm("정말 삭제하시겠습니까?")) {
        todoStore.dispatch(deleteTodo(id));
      }
    }
  }, "")
}

function TodoApp(todo, key) {

  const { initData, getState } = todoState;

  initData(key, "");

  return DynamicDom.createElement("li", {
    id: todo.id,
    className: getState(key).data === "editing"? "editing" : todo.state
  },  TodoView({todo, key}), 
  TodoInput({todo, key}))
}  

export default TodoApp;