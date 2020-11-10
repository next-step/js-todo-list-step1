import createStore from "./core/store.js";
import DynamicDom from "./core/index.js";

import {
  reducer,
  addTodo, 
  deleteTodo, 
  toggleTodoState, 
  editeTodoState,
  updateTodoTitle
} from "./store/index.js";

// const stateAction = new useState();

function TodoApp(todo) {

  // const [data, setState] = stateAction(1);

  return DynamicDom.createElement("li", {
    id: todo.id,
    className: todo.state,
    onDblclick: () => {
      console.log(state());
      init();
    }
  },  TodoList({todo}), 
  TodoInput({todo}))
}

// function useState(payload) {
//   const stateList = [];

//   let state = payload;

//   const setState = (payload) => {
//     stateList.push(payload);
//     init();
//   }


//   const getState = () => {
//     let data 
//     if(stateList) {
//       data = stateList[0]
//       stateList.shift()
//     } else {
//       data = state
//     }
    
//     return data
//   }

//   return [getState(), setState]
// }


  


function TodoList({todo}) {
  return DynamicDom.createElement(
    "div", 
    {
      className: "view",
      id: todo.id,
      onDblclick: ()=> {
        console.log("click")
        console.log(todo)
        changeEditMode(todo.id)
      }
    }, 
    TodoToggle({todo}),
    TodoTitle({todo}),
    TodoButton({id: todo.id})
  )
}

function TodoInput({todo}) {
  return DynamicDom.createElement("input",{
    className: "edit",
    value: todo.title,
    type: "text",
    onDblclick: (e)=> {
      changeEditMode(todo.id)
      e.target.value = todo.title
    },
    onKeypress: (e)=>{
      if(e.keyCode === 13) {
        updateTodo(e.target.value, todo.id)
        changeEditMode(todo.id)
      }
      console.log(e.target.value)
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

function TodoTitle({todo}) {
  return DynamicDom.createElement("label", null, `${todo.title}`)
}

function TodoButton({id}) {
  return DynamicDom.createElement("button", {
    className: "destroy",
    id: id,
    onClick: (e) => {
      app.dispatch({
        type: "DELETE_TODO",
        payload: {
          id: id
        }
      });
    }
  }, "")
}


const todoContainer = document.getElementById("todo-list");
const todoInput = document.querySelector(".new-todo");

const $todoCount = document.querySelector(".todo-count").querySelector("strong");

const app = new DynamicDom({
  todos: [
    {
      id: 1,
      title: "test",
      state: ""
    },
    {
      id: 2,
      title: "test",
      state: ""
    },
    {
      id: 3,
      title: "test",
      state: ""
    },
    {
      id: 4,
      title: "test",
      state: ""
    },
    {
      id: 5,
      title: "test",
      state: ""
    },
  ]
});

function init() {
  app.getState().todos.forEach((todo) => {
    app.addDomList(TodoApp(todo), todo.id);
  })
  app.allDomRender(todoContainer);
  $todoCount.innerHTML = app.getState().todos.length
}

// function update() {
//   const TodoList = app.getState().todos.map((todo) => 
//     TodoApp(todo)
//   )
//   app.compareDom(TodoList, todoContainer)
// }

app.subscriber(init);
init();

function addTodo2(e) {
  if(e.keyCode === 13) {
    app.dispatch({
      type:"ADD_TODO",
      payload: {
        id: app.getState().todos[0]? app.getState().todos[app.getState().todos.length-1].id + 1 : 1,
        title: e.target.value
      }
    })
    e.target.value = ""
  }
  
}

function updateTodo(title, id) {
  console.log("2")
  app.dispatch({
    type:"UPDATE_TODO_TITLE",
    payload: {
      id,
      title
    }
  })
}

function todoToggle(id) {
  console.log("toggle")
  app.dispatch({
    type: "TOGGLE_TODO_STATE",
    payload: {
      id
    }
  })
}

// state에서 edited는 삭제해야함. 다른 방식을 찾아봐야함. useState? 
function changeEditMode(id) {
  app.dispatch({
    type: "EDITE_TODO_STATE",
    payload: {
      id
    }
  })
}

todoInput.addEventListener("keypress",(e) => {addTodo2(e)});

const APIURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

let userList = "";

fetch(`${APIURL}/api/users`)
  .then(data => {
    return data.json()
  })
  .then(data => {
    console.log(data);
  })
