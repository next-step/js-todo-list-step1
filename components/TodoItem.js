export default class TodoItem {
  item;
  onRemove;
  onCheckedToggle;

  constructor(item, onRemove, onCheckedToggle) {
    this.item = item;
    this.onRemove = onRemove;
    this.onCheckedToggle = onCheckedToggle;
  }

  makeTemplate({ title, isCompleted }) {
    const $li = document.createElement("li");

    if (isCompleted) $li.classList.add("completed");

    $li.innerHTML = `
             <div class="view">
                <input class="toggle" type="checkbox" ${
                  isCompleted ? "checked" : ""
                }/>
                <label class="label">${title}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${title}" />
          `;

    const $destroyBtn = $li.querySelector(".destroy");
    $destroyBtn.addEventListener("click", this.onDeleteBtnClick.bind(this));

    const $toggleInput = $li.querySelector(".toggle");
    $toggleInput.addEventListener(
      "change",
      this.onToggleInputChange.bind(this)
    );

    console.log($toggleInput);
    return $li;
  }

  onDeleteBtnClick() {
    this.onRemove(this.item.id);
  }

  onToggleInputChange() {
    this.onCheckedToggle(this.item.id);
  }

  render() {
    return this.makeTemplate(this.item);
  }
}
