import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import Item from "../models/Item.js";
import CountContainer from "./CounterContainer.js";
import TodoFilters from "./TodoFilters.js";
import { LAYERS } from "../utils/constants.js";

export default class ToDoApp {
  items = [];

  /* 표시할 계층 */
  layer = LAYERS.ALL;

  /* items의 상태가 변했을 때 변경을 전달받을 컴포넌트(들) */
  entrustedComponents = [];

  constructor(storedItems) {
    new TodoInput(this.onAdd.bind(this));
    new TodoFilters(this.onLayerChange.bind(this));

    this.entrustedComponents.push(
      new TodoList(
        this.onRemove.bind(this),
        this.onCheckedToggle.bind(this),
        this.onTitleChange.bind(this)
      ),
      new CountContainer()
    );

    /* 스토리지에 저장된 items가 있으면 초기값으로 설정 */
    if (storedItems) this.setState(storedItems);
  }

  notify() {
    this.entrustedComponents.forEach((component) =>
      component.render(this.getItemsFilteredByLayer())
    );
  }

  getItemsFilteredByLayer() {
    switch (this.layer) {
      case LAYERS.ALL:
        return this.items;
      case LAYERS.TODO:
        return this.items.filter(({ isCompleted }) => !isCompleted);
      case LAYERS.COMPLETED:
        return this.items.filter(({ isCompleted }) => isCompleted);
    }
  }

  setState(items) {
    this.items = items;
    /* setState 할때마다 로컬 스토리지에 저장 */
    localStorage.setItem("items", JSON.stringify(this.items));
    /* setState 할때마다 state가 변경되었음을 알림 */
    this.notify();
  }

  /* state자체에는 변화가 없지만 보여져야할 items가 달라지기때문에 notify 해야함 */
  onLayerChange(layer) {
    this.layer = layer;
    this.notify();
  }

  onAdd(item) {
    const itemAddedState = [item, ...this.items];
    this.setState(itemAddedState);
  }

  onRemove(targetId) {
    const targetDeletedState = this.items.filter(
      (item) => item.id !== targetId
    );
    this.setState(targetDeletedState);
  }

  onCheckedToggle(targetId) {
    const sliced = [...this.items];
    const targetIndex = sliced.findIndex(({ id }) => id === targetId);
    const target = sliced[targetIndex];

    const newItem = { ...target, isCompleted: !target.isCompleted };
    sliced[targetIndex] = newItem;

    this.setState(sliced);
  }

  onTitleChange(targetId, title) {
    const sliced = [...this.items];
    const targetIndex = sliced.findIndex(({ id }) => id === targetId);
    const target = sliced[targetIndex];

    const newItem = { ...target, title };
    sliced[targetIndex] = newItem;

    this.setState(sliced);
  }
}
