import ReillyDOM from "./ReillyDOM.js";

/**
 * @typedef { Object } ReillyNode
 * @property { ReillyNodeType } nodeType
 * @property { PropsType } [props]
 * @property { ReillyNodeChildren } children
 */

/**
 * @typedef {string | Function} ReillyNodeType
 * @typedef { Record<keyof Node, Node[keyof Node]> | null } PropsType
 * @typedef { ReillyNode[] | string } ReillyNodeChildren
 */

/**
 * @namespace
 */
class Reilly {
  /**
   * @desc resolves params into tree of `ReillyNode` recursively
   * @param { NodeType } nodeType - HTMLElement nodeType string or function of class Component identifier
   * @param { PropsType } [props] - Node interface members
   * @param { ReillyNodeChildren } children - `ReillyNode`s in Array
   * @returns { ReillyNode } `ReillyNode`
   * @example
   *    createElement('div', {id: 1})
   *    createElement(App, null, createElement(UList, null, ListItem1,ListItem2))
   */

  static createElement(nodeType, props, ...children) {
    if (typeof nodeType === "function") {
      if (nodeType.prototype instanceof this.Component) {
        const component = new nodeType({ ...props, children });
        if (component.constructor.name === "App")
          component._owner = document.querySelector("#root");
        else component._owner = document.querySelector(".view");
        return component.render();
      }
      return nodeType({ ...props, children });
    }

    return {
      nodeType,
      props,
      children
    };
  }

  /**
   * @abstract basic implementation of Reilly Component
   */
  static Component = class Component {
    constructor(props = {}) {
      this.props = props;
    }

    setState(newState) {
      this.state = { ...this.state, ...newState };

      ReillyDOM.render(this.render(), this._owner);
      this.componentDidUpdate();
    }

    componentDidUpdate() {
      console.warn(`Not Implemented, plz override this`);
    }

    render() {
      console.warn(`Not Implemented, plz override this`);
    }
  };
}

export const createElement = Reilly.createElement.bind(Reilly);

export default Reilly;
