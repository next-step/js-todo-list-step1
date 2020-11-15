
const ADD_TODO          = "ADD_TODO";
const DELETE_TODO       = "DELETE_TODO";
const TOGGLE_TODO_STATE = "TOGGLE_TODO_STATE";
const EDITE_TODO_STATE  = "EDITE_TODO_STATE";
const UPDATE_TODO_TITEL = "UPDATA_TODO_TITLE";

//actions

export const addTodo = (id, title, state) =>
  ({ type: ADD_TODO, payload: {id, title, state}});

export const deleteTodo = id =>
  ({ type: DELETE_TODO, payload: { id }});

export const toggleTodoState = id => 
  ({ type: TOGGLE_TODO_STATE, payload: { id }});

export const updateTodoTitle = (id, title) => 
  ({ type: UPDATE_TODO_TITEL, payload: {id, title }});


// localStorage 추가 
export function reducer(state, { type, payload }) {

  let newState;

  switch (type) {
    case ADD_TODO:

      newState = Object.assign({}, state, {
        todos: [
          ...state.todos, 
          {
            id: payload.id,
            title: payload.title,
            state: payload.state,
          }
        ]
      });

    break;

    case DELETE_TODO: 

      newState = Object.assign({}, state, {
        todos: state.todos.filter(todo => 
          String(todo.id) !== String(payload.id)
        )
      });
    
    break;

    case TOGGLE_TODO_STATE:

      newState = Object.assign({}, state, {
        todos: state.todos.map( todo => 
          todo.id == payload.id ? {
            ...todo,
            state: todo.state === "completed"?  "active" : "completed"
          } : todo
        )
      });
    
    break;

    case UPDATE_TODO_TITEL: 
      
      newState = Object.assign({}, state, {
        todos: state.todos.map( todo => 
          todo.id === payload.id ? {
            ...todo,
            title: payload.title
          } : todo 
        )
      });

    break;

    case EDITE_TODO_STATE:
     
      newState =  Object.assign({}, state, {
        todos: state.todos.map( todo => 
          todo.id == payload.id ? {
            ...todo,
            state: todo.state === "editing"? "" : "editing"
          } : todo
        )
      });
    
    break;

  default :
    const localTodos = localStorage.getItem("todo");
    if(localTodos && localTodos !== "null") {
      newState = JSON.parse(localTodos)
    } else {
      newState = {
        todos: []
      }
    }
  }

  localStorage.setItem("todo", JSON.stringify(newState));

  return newState;
}
