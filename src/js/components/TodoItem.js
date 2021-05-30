import { STATUS_TYPE } from "../utils/Constants.js";

export class TodoItem {
  constructor(id, content, status) {
    this.id = id;
    this.content = content;
    this.status = status;
  }

  swapCheckStatus(id) {
    if (this.id === id && this.status === "active") {
      this.status = "completed";
    } else if (this.id === id && this.status === "completed") {
      this.status = "active";
    }
    return this;
  }

  isCompleted() {
    return this.status === STATUS_TYPE.COMPLETED;
  }
}
