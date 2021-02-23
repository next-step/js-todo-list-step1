export default  function ItemTitle({title}) {
    this.element = document.createElement("label");
    this.element.textContent = title;
}

ItemTitle.prototype.render = function() {
    return this.element;
}
