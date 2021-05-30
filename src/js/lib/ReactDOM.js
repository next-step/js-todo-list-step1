const renderRealDOM = (vdom) => {
  const $element =
    vdom.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(vdom.type);

  if (vdom.props) {
    Object.entries(vdom.props).forEach(
      ([key, value]) => ($element[key] = value)
    );
  }

  vdom.children
    .flat()
    .map(renderRealDOM)
    .forEach((node) => $element.appendChild(node));

  return $element;
};

export const render = (vdom, container) => {
  container.appendChild(renderRealDOM(vdom));
};
