
const ADD_TODO          = "ADD_TODO";
const DELETE_TODO       = "DELETE_TODO";
const TOGGLE_TODO_STATE = "TOGGLE_TODO_STATE";
const EDITE_TODO_STATE  = "EDITE_TODO_STATE";
// const CHANGE_VIEW_STATE = "CHANGE_VIEW_STATE";
const UPDATE_TODO_TITEL = "UPDATA_TODO_TITLE";

//actions

export const addTodo = ({id, title}) =>
  ({ type: ADD_TODO, payload: {id, title}});

export const deleteTodo = id =>
  ({ type: DELETE_TODO, payload: { id }});

export const toggleTodoState = id => 
  ({ type: TOGGLE_TODO_STATE, payload: { id }});

export const editeTodoState = id =>
  ({ type: EDITE_TODO_STATE, payload: { id }});

export const updateTodoTitle = id => 
  ({ type: UPDATE_TODO_TITEL, payload: {id, title }});
 
const initialState = {
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
  ],
  screenMode: ""
}

export const reducer = ( state = initialState, { type, payload }) => {
  
  switch (type) {

    case ADD_TODO: 
      return Object.assign({}, state, {
        todos: [
          ...state.todos, 
          {
            id: payload.id,
            title: payload.title,
            state: ""
          }
        ]
      });

    case DELETE_TODO: 
      console.log(state, payload.id);
      return Object.assign({}, state, {
        todos: state.todos.filter(todo => 
          todo.id !== Number(payload.id)
        )
      });

    case TOGGLE_TODO_STATE:
      return Object.assign({}, state, {
        todos: state.todos.map( todo => {
          todo.id === payload.id ? {
            ...todo,
            state: "completed"?  "" : "completed"
          } : todo
        })
      });

    case UPDATE_TODO_TITEL: 
      return Object.assign({}, state, {
        todos: state.todos.map( todo => {
          todo.id === payload.id ? {
            ...todo,
            title: payload.title
          } : todo 
        })
      });

    case EDITE_TODO_STATE:
      return Object.assign({}, state, {
        todos: state.todos.map( todo => {
          todo.id === payload.id ? {
            ...todo,
            state: "edited"? "" : "edited"
          } : todo
        })
      });

    default :
      return state

  }

}
