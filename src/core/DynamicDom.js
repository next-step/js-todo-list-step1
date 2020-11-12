class DynamicDom {
  // fiber
  currentFiberList = [];
  nextFiberList = [];

  state;

  constructor() {
  }

  getState() {
    return this.state;
  }

  setState(payload) {
    this.state = payload;
  }

  static createElement(type, props, ...children) {
    return {
      type: type,
      props: {
        ...props
      },
      children: children? children.map(child =>
        typeof child === "object" ?
        child 
        : this.createTextElement(child))
        : []
    }
  }

  static createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text
      },
      children: []
    }
  }

  createFiber(element, key = 1) {
    const dom = element.type == "TEXT_ELEMENT" 
        ? document.createTextNode("")
        : document.createElement(element.type);

      const isEvent = key => 
        key.startsWith("on");
      const isKey = key => 
        key === "key";
      const isDataset = key =>
        key === "dataset";
      const isProperty = key => 
        key !== "children" && !isEvent(key) && !isKey(key) && !isDataset(key); 

      Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
          dom[name] = element.props[name]
        });
      
      Object.keys(element.props)
        .filter(isEvent)
        .forEach(name => {
          const eventType = name.toLowerCase().substring(2);
          dom.addEventListener(eventType, element.props[name]);
        });
      

      const fiber = {
        dom,
        element: {
          type: element.type,
          props: element.props
        },
        key: Number(key),
        children: []
      }
    
      if(element.props.dataset) {
        Object.keys(element.props.dataset)
          .forEach(name => {
            dom.dataset[name] = element.props.dataset[name]
          })
      }

      return fiber;
  }

  updateDomProps(prevProps, nextProps, dom) {
    const isEvent = key => key.startsWith("on");
    const isProperty = key => key !== "children" && !isEvent(key);
    const isNew = (prev, next) => key => prev[key] !== next[key];
    const isGone = (prev, next) => key => !(key in next);

    // Remove old Events
    Object.keys(prevProps)
      .filter(isEvent)
      .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });

    // Remove old properties
    Object.keys(prevProps)
      .filter(isProperty)
      .filter(isGone(prevProps, nextProps))
      .forEach(name => {
        dom[name] = "";
      });

    // Set new or changed properties
    Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        dom[name] = nextProps[name];
      });

    // Add event listeners
    Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
      });

  }

  removeDomList(keyList, fiberList, dom) {
    const removeList = fiberList.filter(fiber => 
        !keyList.includes(Number(fiber.key))
      );

    removeList.forEach(child => {
      dom.removeChild(child.dom);
    });
  }

  setFiber(element, key = 1, fiberList) {
    const preFiber = Array.isArray(fiberList)
      ? fiberList.filter(fiber => fiber.key === key)[0]
      : fiberList.children.filter(fiber => fiber.key === key)[0]

  
    if(preFiber) {

      this.updateDomProps(preFiber.element.props, element.props, preFiber.dom);

      const keyList = element.children.map((ele, idx) => idx);

      this.removeDomList(keyList, preFiber.children, preFiber.dom);
      
      const children = [...element.children.map((child, idx) =>
        this.setFiber(child, idx, preFiber)
      )]

      return {
        dom: preFiber.dom,
        element: {
          type: element.type,
          props: element.props
        },
        key: Number(preFiber.key),
        children
      }

    } else {      

      const fiber = this.createFiber(element, key)

      fiber.children =[...element.children.map((child, key) => 
        this.setFiber(child, key, fiber)
      )];

      if(!Array.isArray(fiberList)) {
        fiberList.dom.appendChild(fiber.dom);
      }

      return fiber;
    }
  }

  addFiberList(element, key) {
    const fiber = this.setFiber(element, key, this.currentFiberList);
    this.nextFiberList.push(fiber);
  }

  render(container, element) {

    if(Array.isArray(element)) {
      element.forEach((ele, idx) => {
        this.addFiberList(ele, idx);
      })
    } else {
      this.addFiberList(ele, key = 1);
    }

    const keyList = this.nextFiberList.map(fiber => fiber.key);

    this.removeDomList(keyList, this.currentFiberList, container)

    this.nextFiberList.forEach(( nextFiber )=>{
      const preFiber = this.currentFiberList.filter(fiber =>
          fiber.key === nextFiber.key
        )[0]
      if(!preFiber) {
        container.appendChild(nextFiber.dom)
      }
    });

    this.currentFiberList = [...this.nextFiberList];

    this.nextFiberList = [];
  }

  modifyFiber (element, key) {
    const nextFiber = this.setFiber(element, key, this.currentFiberList);
    this.currentFiberList = this.currentFiberList.map(fiber => 
        fiber.key === key? nextFiber : fiber
      );
  }

  findFiber(key) {    
    return this.currentFiberList.filter(fiber =>
        fiber.key === Number(key) 
      )[0]
  }

}

export default DynamicDom;