/**
 * @typedef { Record<keyof Node, Node[keyof Node]> | null } PropsType
 */

/**
 * @typedef {Object} PseudoNode
 * @property {(string | Function)} nodeType
 * @property { PropsType } [props]
 * @property { PseudoNode[] | string} children
 */

/**
 * @namespace
 */
class Reilly {
  /**
   * @desc resolves params into tree of `PseudoNode` recursively
   * @param { string | Function } nodeType - HTMLElement nodeType string or function of class Component identifier
   * @param { PropsType } [props] - Node interface members
   * @param { PseudoNode[] | string } children - `PseudoNode`s in Array
   * @returns {PseudoNode} `PseudoNode`
   *
   * @example
   *    createElement('div', {id: 1})
   *    createElement(App, null, createElement(UList, null, ListItem1,ListItem2))
   */
  static createElement(nodeType, props, ...children) {
    if (typeof nodeType === "function") {
      if (nodeType.prototype instanceof this.Component) {
        const component = new nodeType({ ...props, children });
        return component.render();
      }
      return nodeType(props, ...children);
    }

    return { nodeType, props, children };
  }

  /**
   * @abstract basic implementation of Reilly Component
   */
  static Component = class Component {
    state = {};

    constructor(props) {
      this.props = props;
    }

    setState(newState) {
      console.warn("stateChanged!", newState);
      this.state = newState;
      this.render();
    }

    render() {}
  };
}

export default Reilly;
