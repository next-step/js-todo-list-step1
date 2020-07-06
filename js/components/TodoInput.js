export default class TodoInput {
  constructor({ $element, onEnter }) {
    this.$element = $element;
    this.handleEnter = onEnter;

    this.$element.addEventListener('keypress', e => {
      const value = e.target.value.trim();
      if (e.key === 'Enter' && value) {
        this.handleEnter(value);
        this.$element.value = '';
      }
    });
  }
}
