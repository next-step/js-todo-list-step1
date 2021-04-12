function addElement(str, container) {
  let newLi = document.createElement("li");
  let textNode = document.createTextNode(str);
  newLi.appendChild(textNode);
  container.appendChild(newLi);
}

export default addElement;
