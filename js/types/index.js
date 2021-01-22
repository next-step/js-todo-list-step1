import { uuid } from "../utils/uuid.js";

/**
 * typed Todo
 * @constructor generates Todos
 * @param {string} content
 */
export function Todo(content) {
  if (!new.target)
    throw new Error("this is constructor, call with the new keyword");

  this.id = uuid();
  this.content = content;
  this.completed = false;
}

export class AppState {
  todos = [];
  nav = "";
}
