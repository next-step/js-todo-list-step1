export default class View {
  init($element) {
    if (!$element) throw $element;
    this.$element = $element;
    return this;
  }

  on(event, eventHandler) {
    this.$element.addEventListener(event, eventHandler);
    return this;
  }

  emit(event, data) {
    const newEvent = new CustomEvent(event, { detail: data });
    this.$element.dispatchEvent(newEvent);
    return this;
  }
}
