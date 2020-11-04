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

// class DynamicDom {
//   wipRoot = [];
//   rootId;

//   data;

//   constructor(rootId) {
//     this.rootId = rootId
//   }

//   static createElement(type, props, ...children) {
//     return {
//       type: type,
//       props: {
//         ...props,
//         children: children? children.map(child => 
//           typeof child === "object" ?
//           child : this.createTextElement(child)
//         ) : []
//       }
//     }
//   }

//   static createTextElement(text) {
//     return  {
//       type: "TEXT_ELEMENT",
//       props: {
//         nodeValue: text,
//         children: [],
//       }
//     }
//   }

//   setData (data) {
//     this.data = data
//   }

//   render(element, container) {
//     const dom = element.type == "TEXT_ELEMENT" 
//       ? document.createTextNode("")
//       : document.createElement(element.type);

//     if(element.props) {
//       const isProperty = key => key !== "children";
//       Object.keys(element.props)
//       .filter(isProperty)
//       .forEach(name => {
//         dom[name] = element.props[name]
//       })
//     }

//     element.props.children.forEach(child => 
//       this.render(child, dom)
//     );
    
//     if(container.id && container.id == this.rootId) {
//       container.innerHTML = "";
//     }

//     container.appendChild(dom); 
//   }
// }

function TodoApp(todo) {
  return DynamicDom.createElement("li", {
    id: 1,
    dataset: {
      id: todo.id
    }
  },  TodoList({todo, id: todo.id}), 
  TodoInput({id: todo.id}))
}
  


function TodoList({todo, id}) {
  return DynamicDom.createElement(
      "div", 
      {
        className: "view",
        id: id
      }, 
      TodoToggle(),
      TodoTitle({todo}),
      TodoButton({id})
    )
}

function TodoInput({id}) {
  return DynamicDom.createElement("input",{
    className: "edit",
    value: "새로운 타이틀",
    type: "text"
  }, "")
}

function TodoToggle() {
  return DynamicDom.createElement("input", {
    className: "toggle",
    type: "checkbox"  
  }, "")
}

function TodoTitle({todo}) {
  return DynamicDom.createElement("label", null, `${todo.title}`)
}

function TodoButton({id}) {
  // dispatch(deleteTodo({id}))
  return DynamicDom.createElement("button", {
    className: "destroy",
    id: id,
    onClick: (e) => {
      // app.setState(id++)
      // app.dispatch({
      //   type: "DELETE_TODO",
      //   payload: {
      //     id: id
      //   }
      // })
      // console.log(id, e)
      // app.deleteDom(todoContainer, id);
      app.testDom(id);
    }
  }, "")
}


const todoContainer = document.getElementById("todo-list");
const todoInput = document.querySelector(".new-todo");
const app = new DynamicDom({
  todos: [
    {
      id: 1,
      title: "test",
      state: "aaa"
    },
    {
      id: 2,
      title: "test",
      state: "aaa"
    },
    {
      id: 3,
      title: "test",
      state: "aaa"
    },
    {
      id: 4,
      title: "test",
      state: "aaa"
    },
    {
      id: 5,
      title: "test",
      state: "aaa"
    },
  ]
});

function init() {
  app.getState().todos.forEach((todo) => {
    app.addDomList(TodoApp(todo), todo.id);
  })
  app.allDomRender(todoContainer);
}
app.subscriber(init);
init();



// const app = new DynamicDom(todoContainer.id);
// app.render(TodoApp(), todoContainer);

// let int = 1;

// const todoDomList = [];

// function init(store) {
//   store.dispatch("");
//   todoInput.addEventListener("click",() => {
//     store.dispatch(addTodo({id: int++, title: "추가"}));
//   });
//   todoContainer.addEventListener("click", (e) => {
//     console.log(e.target.nodeName === "LABEL", e.target.parentNode);
//     switch(e.target.nodeName) {
//       case "BUTTON": 
//       console.log(e.target.parentNode.id)
//         store.dispatch(deleteTodo(e.target.parentNode.id))
//         app.setData(10)
//         console.log(app.data)
//       case "INPUT": 
//         if(e.target.type === "checkbox") {
//           store.dispatch(toggleTodoState(id = e.target.id))
//         }
//     }
//   })

  // app.render(TodoApp({state: store.getState(),dispatch: store.dispatch }), todoContainer);
  // store.subscribe(()=>{
  //   app.render(TodoApp({state: store.getState(), dispatch:store.dispatch }), todoContainer);
  // });

  // store.getState().todos.forEach((todo, idx) => 
  //   app.createDom(TodoApp(todo), idx)
  // )
  // app.domRender(todoContainer);

  // app.domRender(todoContainer);


  // todoContainer.removeChild(todoDomList[0]);
  // todoContainer.removeChild(todoDomList[2]);

  // console.log(todoDomList);
  
// }

// const store = createStore(reducer);

// init(store);


// function createDom(element) {
//   const dom = element.type == "TEXT_ELEMENT" 
//     ? document.createTextNode("")
//     : document.createElement(element.type);

//     const isProperty = key => 
//       key !== "children";
//     Object.keys(element.props)
//     .filter(isProperty)
//     .forEach(name => {
//       dom[name] = element.props[name]
//     })

//   element.props.children.forEach(child => {
//     app.render(child, dom)
//   });

//   dom.addEventListener("click", ()=> {
//     console.log("click")
//   })

//   dom.dataset.dataId = "1"
//   // console.log(dom["dataset"])

//   todoDomList.push(dom);
   
// }

// function domRender(domList, container) {
//   domList.forEach(dom => container.appendChild(dom));
// }
// console.log()


