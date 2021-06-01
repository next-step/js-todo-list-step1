export default function TodoItem({ id, title, status }) {
  this.id = id;
  this.title = title;
  this.status = status;

  this.complete = () => {
    this.status = "completed";
  };

  this.isCompleted = () => {
    return this.status === "completed";
  };

  this.modifyTitle = (newTitle) => {
    this.title = newTitle;
  };

  this.getTemplate = () => `<li ${this.isCompleted() && "class='completed'"}>
  <div class="view" id=${this.id}>
    <input class="toggle" type="checkbox" ${
      this.isCompleted() ? "checked" : ""
    } />
    <label class="label">${this.title}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="${this.title}" />
</li>`;
}
