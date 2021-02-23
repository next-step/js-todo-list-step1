import { uuid } from "../utils/uuid.js";
import { FILTER_ENUM } from "./constants.js";

/**
 * @typedef {Object} TodoType
 * @property {string} id
 * @property {string} content
 * @property {boolean} completed
 */

/**
 * @class generates Todos
 * @param {string} content
 * @returns {TodoType}
 */
export function Todo(content) {
  if (!new.target)
    throw new Error("this is constructor, call with the new keyword");

  this.id = uuid();
  this.content = content;
  this.completed = false;
  this._createdAt = new Date().toISOString();
  this._updatedAt = new Date().toISOString();
}

/**
 * @constructor construct initial state
 */
export class TodoState {
  /**
   * @param {TodoType[]} todos
   * @param {FILTER_ENUM} mode
   * @param {null | string} edittingId
   */
  constructor(todos, mode, edittingId) {
    this.todos = todos;
    this.mode = mode;
    this.edittingId = edittingId;
  }
}
