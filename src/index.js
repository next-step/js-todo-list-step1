import App from "./Components/App.js";
import todoReducer from "./reducer/todo.js";
import { createStore } from "./utils/my-redux.js";

const store = createStore(todoReducer);

App(store);
