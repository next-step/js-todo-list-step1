import DynamicDom from "../core/DynamicDom.js";
import { app, todoState, todoStore } from "../index.js";
import { 
  deleteTodo,
  toggleTodoState,
  updateTodoTitle 
} from "../store/index.js";

function TodoToggleButton({todo}) {

  return DynamicDom.createElement("input", {
    className: "toggle",
    type: "checkbox",
    checked: todo.state === "completed" ? true : false,
    onClick: ()=> {
      todoStore.dispatch(toggleTodoState(todo.id));
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

function TodoDeleteButton({id}) {
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
 
function TodoView({todo, key}) {
  return DynamicDom.createElement(
    "div", 
    {
      className: "view",
      id: todo.id
    }, 
    TodoToggleButton({todo}),
    TodoTitle({todo, key}),
    TodoDeleteButton({id: todo.id})
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
        todoStore.dispatch(
          updateTodoTitle(todo.id, e.target.value)
        );
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