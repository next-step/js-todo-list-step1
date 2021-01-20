/**
 * @typedef { Record<keyof Node, Node[keyof Node]> | null } PropsType
 * @typedef {{nodeType: (string | Function), props: PropsType, children: PseudoNode[] | string }} PseudoNode
 */

/**
 * Modify DOM
 * @namespace
 */
class ReillyDOM {
  /**
   * @param {PseudoNode} pseudoNode - represents a root Node which contains children
   * @param {HTMLElement} container - container node for `pseudoNode`
   */
  static render(pseudoNode, container) {
    container.appendChild(this.renderElement(pseudoNode));
  }

  /**
   * @param {PseudoNode} pseudoNode
   * @returns {HTMLElement} HTML element referred by the `pseudoNode`
   */
  static renderElement(pseudoNode) {
    if (typeof pseudoNode === "string") {
      return document.createTextNode(pseudoNode);
    }

    const $element = document.createElement(pseudoNode.nodeType);

    for (let [key, value] of Object.entries(pseudoNode.props ?? {})) {
      $element[key] = value;
    }

    pseudoNode.children.map(this.renderElement.bind(this)).forEach((elem) => {
      $element.appendChild(elem);
    });

    return $element;
  }
}

export default ReillyDOM;
