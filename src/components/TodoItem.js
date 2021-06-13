const DONE = "checked";
const NOTDONE = "false";

export default function TodoItem(value) {
  this.content = value;
  this.id = Date.now();
  this.status = NOTDONE;
}
