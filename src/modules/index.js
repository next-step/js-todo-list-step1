import {createStore} from "../redux/index.js";
import {reducer} from "./todo/index.js";

export const store = createStore(reducer);
