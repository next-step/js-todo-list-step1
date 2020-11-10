class DynamicDom {
  // fiber
  currentFiberList = [];
  nextFiberList = [];
  // store
  state = {
    todos: [],
    test: "양호"
  };
  listeners = [];
  

  ADD_TODO = "ADD_TODO";
  DELETE_TODO = "DELETE_TODO";

  constructor(store) {
    this.state = store
  }

  getState() {
    return this.state;
  }

  setState(payload) {
    this.state = payload;
  }

  dispatch(action) {
    this.setState(this.reducer(this.state, action));
    this.publish();
  }

  publish(listeners) {
    if(listeners) {
      listeners.forEach(listener => {
        listener();
      })
    } else {
      this.listeners.forEach(({ subscriber })=> {
        subscriber();
      })
    }
  }

  subscriber(subscriber) {
    this.listeners.push({
      subscriber
    })
  }

  reducer(state = this.state, { type, payload }) {
    switch (type) {
      case "ADD_TODO":
      return Object.assign({}, state, {
        todos: [
          ...state.todos, 
          {
            id: payload.id,
            title: payload.title,
            state: ""
          }
        ]
      });

    case "DELETE_TODO": 
      return Object.assign({}, state, {
        todos: state.todos.filter(todo => 
          String(todo.id) !== String(payload.id)
        )
      });

    case "TOGGLE_TODO_STATE":
      return Object.assign({}, state, {
        todos: state.todos.map( todo => 
          todo.id == payload.id ? {
            ...todo,
            state: todo.state === "completed"?  "" : "completed"
          } : todo
        )
      });

    case "UPDATE_TODO_TITLE": 
      return Object.assign({}, state, {
        todos: state.todos.map( todo => 
          todo.id === payload.id ? {
            ...todo,
            title: payload.title
          } : todo 
        )
      });

    case "EDITE_TODO_STATE":
      console.log("payload")
      return Object.assign({}, state, {
        todos: state.todos.map( todo => 
           todo.id == payload.id ? {
            ...todo,
            state: todo.state === "editing"? "" : "editing"
          } : todo
        )
      });

    default :
      return state
    }
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

  childCreateDom(element, parentFiber, key) {
    const preFiber = parentFiber.children.filter(child => Number(child.key) === Number(key))[0];

    if(preFiber) {
      
      this.updateDomProps(preFiber.element.props, element.props, preFiber.dom);

      const keyList = element.children.map((ele, idx) => idx);
  
      const removeList = preFiber.children.filter(fiber => !keyList.includes(fiber.key));
      if(removeList) {
        removeList.forEach(child => {
          preFiber.dom.removeChild(child.dom);
        })
      }
      
      const children = [...element.children.map((child, idx) =>
        this.childCreateDom(child, preFiber, idx)
      )];

      return {
        dom: preFiber.dom,
        element: {
          type: element.type,
          props: element.props
        },
        key: preFiber.key,
        children
      }

    } else {
      const dom = element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);

      const isEvent = key => 
        key.startsWith("on");
      const isKey = key => 
        key === "key";
      const isProperty = key => 
        key !== "children" && !isEvent(key) && !isKey(key);


      Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
          dom[name] = element.props[name]
        });
      
      Object.keys(element.props)
        .filter(isEvent)
        .forEach(name => {


      fiber.children =[...element.children.map((child, idx) =>
        this.childCreateDom(child, fiber, idx)
      )];

        parentFiber.dom.appendChild(dom);
        return fiber
      }

  }

  createDom(element) {
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

      fiber.children =[...element.children.map((child, key) => 
        this.childCreateDom(child, fiber, key)
      )];
    
      if(element.props.dataset) {
        Object.keys(element.props.dataset)
          .forEach(name => {
            dom.dataset[name] = element.props.dataset[name]
          })
      }

      return fiber;
  }

  createRootDom(element, key = 1) {
    const preFiber = this.currentFiberList.filter(fiber => fiber.key === key)[0]
  
    if(preFiber) {

      this.updateDomProps(preFiber.element.props, element.props, preFiber.dom);

      const keyList = element.children.map((ele, idx) => idx);
  
      const removeList = preFiber.children.filter(fiber => !keyList.includes(Number(fiber.key)));

      removeList.forEach(child => {
        preFiber.dom.removeChild(child.dom);
      })

      
      const children = [...element.children.map((child, idx) =>
        this.childCreateDom(child, preFiber, idx)
      )]

      return {
        dom: preFiber.dom,
        element: {
          type: element.type,
          props: element.props
        },
        key: preFiber.key,
        children
      }

    } else {
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

      fiber.children =[...element.children.map((child, key) => 
        this.childCreateDom(child, fiber, key)
      )];
    
      if(element.props.dataset) {
        Object.keys(element.props.dataset)
          .forEach(name => {
            dom.dataset[name] = element.props.dataset[name]
          })
      }

      return fiber;
    }
  }

  addDomList(ele, key) {
    const fiber = this.createRootDom(ele, key);
    this.nextFiberList.push(fiber);
  }

  allDomRender(container) {

    const keyList = this.nextFiberList.map(fiber => fiber.key);
    
    const removeList = this.currentFiberList.filter(fiber => !keyList.includes(fiber.key));

    removeList.forEach(fiber => {
      container.removeChild(fiber.dom);
    });

    this.nextFiberList.forEach((nextFiber)=>{
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

  findFiber(key) {    
    return this.currentFiberList.filter(fiber =>
              fiber.key === Number(key) 
            )[0]
  }

  updateDomProps(prevProps, nextProps, dom) {
    const isEvent = key => key.startsWith("on");
    const isProperty = key => key !== "children" && !isEvent(key);
    const isNew = (prev, next) => key => prev[key] !== next[key];
    const isGone = (prev, next) => key => !(key in next);

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

}

export default DynamicDom;