export default class TodoItem {
  item;
  onRemove;

  constructor(item, onRemove) {
    this.item = item;
    this.onRemove = onRemove;
  }

  makeTemplate(title) {
    const $li = document.createElement("li");

    $li.innerHTML = `
             <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${title}" />
          `;

    const $destroyBtn = $li.querySelector(".destroy");

    $destroyBtn.addEventListener("click", this.onDeleteButtonClick.bind(this));

    return $li;
  }

  onDeleteButtonClick() {
    this.onRemove(this.item.id);
  }

  render() {
    return this.makeTemplate(this.item.title);
  }
}
