export const VIEW = "view";
export const EDITING = "editing";
export const COMPLETED = "completed";

export default function TodoItem({ id, contents, status = VIEW }) {
  this.id = id;
  this.contents = contents;
  this.status = status;
}
