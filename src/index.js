import { createStore } from "./utils/my-redux.js";
import todoReducer from "./reducer/todo.js";
import App from "./Components/App.js";

const store = createStore(todoReducer);

App(store);
