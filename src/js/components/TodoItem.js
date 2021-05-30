import { STATUS_TYPE } from "../utils/Constants.js";

export class TodoItem {
  constructor(id, content, status) {
    this.id = id;
    this.content = content;
    this.status = status;
  }
}
