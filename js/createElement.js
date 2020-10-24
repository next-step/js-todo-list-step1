export default class DOMelement {
  constructor(tag) {
    this.element = document.createElement(tag);
  }

  addProperties = (className, attrProps) => {
    this.element.className = className;
    if (attrProps) {
      this.element.setAttribute(
        attrProps.attributeKey,
        attrProps.attributeValue
      );
      return this.element;
    }
    return this.element;
  };
}
