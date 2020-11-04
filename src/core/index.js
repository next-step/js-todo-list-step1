class DynamicDom {
  // dom 
  currentDomList = [];
  nextDomList = [];
  // element
  currentElementList = [];
  nextElementList = [];
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
    // this.publish(listeners? listeners : null);
  }

  publish(listeners = this.listeners) {
    listeners.forEach(({ subscriber })=> {
      subscriber();
    })
  }

  subscriber(subscriber) {
    this.listeners.push({
      subscriber
    })
  }

  reducer(state = this.state, { type, payload }) {
    switch (type) {
      case this.ADD_TODO: 
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
      console.log(state, payload.id);
      return Object.assign({}, state, {
        todos: state.todos.filter(todo => 
          todo.id !== Number(payload.id)
        )
      });

    case TOGGLE_TODO_STATE:
      return Object.assign({}, state, {
        todos: state.todos.map( todo => {
          todo.id === payload.id ? {
            ...todo,
            state: "completed"?  "" : "completed"
          } : todo
        })
      });

    case UPDATE_TODO_TITEL: 
      return Object.assign({}, state, {
        todos: state.todos.map( todo => {
          todo.id === payload.id ? {
            ...todo,
            title: payload.title
          } : todo 
        })
      });

    case EDITE_TODO_STATE:
      return Object.assign({}, state, {
        todos: state.todos.map( todo => {
          todo.id === payload.id ? {
            ...todo,
            state: "edited"? "" : "edited"
          } : todo
        })
      });

    default :
      return state
    }
  }

  static createElement(type, props, ...children) {
    return {
      type: type,
      props: {
        ...props,
        children: children? children.map(child =>
          typeof child === "object" ?
          child 
          : this.createTextElement(child))
          : []
      }
    }
  }

  static createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    }
  }

  childCreateDom(element, container, parentKey) {
    const dom = element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

    const isEvent = key => 
      key.startsWith("on");
    const isDataset = key => 
      key === "dataset";
    const isProperty = key => 
      key !== "children" && !isEvent(key) && !isDataset(key);


    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name]
      });
    
    Object.keys(element.props)
      .filter(isEvent)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType,element.props[name]);
      });

    element.props.children.forEach(child => {
      this.childCreateDom(child, dom, parentKey)
    });

    if(element.props.dataset) {
      Object.keys(element.dataset)
      .forEach(name => {
        dom.dataset[name] = element.props.dataset[name]
      })
    }

    container.appendChild(dom);

  }

  createDom(element, key) {

    const dom = element.type == "TEXT_ELEMENT" 
      ? document.createTextNode("")
      : document.createElement(element.type);
  
    const isEvent = key => 
      key.startsWith("on");
    const isDataset = key => 
      key === "dataset";
    const isProperty = key => 
      key !== "children" && !isEvent(key) && !isDataset(key);

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


    element.props.children.forEach(child => {
      this.childCreateDom(child, dom, key)
    });
  
    if(element.props.dataset) {
      Object.keys(element.props.dataset)
        .forEach(name => {
          dom.dataset[name] = element.props.dataset[name]
        })
    }

    return {dom, element};
  }

  addDomList(ele, key) {
    const { dom, element } = this.createDom(ele, key);
    this.nextDomList.push(dom);
    this.nextElementList.push(element);
    this.nextFiberList.push({dom, element});

  }

  testDom(key) {
    this.findDom(key).classList = "test";
    this.findElement(key)
    const dom = this.createDom(this.findElement(key), key).dom.parentNode;
    console.log("test", dom)
  }

  allDomRender(container) {
    this.nextDomList.forEach(dom => 
      container.appendChild(dom)
    )
    
    this.currentDomList = [...this.nextDomList];
    this.currentElementList = [...this.nextElementList];
    this.currentFiberList = [...this.nextFiberList];
    this.nextDomList = [];
    this.nextElementList = [];
    this.nextFiberList = [];
    console.log(this.currentDomList);
    console.log(this.currentFiberList);
  }

  findDom(key) {    
    return this.currentDomList.filter(dom =>
        dom.dataset.id === String(key) 
      )[0]
  }
  
  findElement(key) {
    return this.currentElementList.filter(ele =>
        ele.props.dataset.id === key
      )[0]
  }

  deleteDom(container, key) {
    const dom = this.findDom(key)
    console.log(dom)
    container.removeChild(dom)
    this.currentDomList = this.currentDomList.filter(dom =>
      dom.dataset.id !== String(key)
    )
    console.log(this.currentDomList)
  }

  updateDomRender(container, nextDom) {
    const key = nextDom.dataset.id;

    this.currentDomList.map(dom =>
      dom.dataset.id === key? nextDom : dom
    )

    container.replaceChild(nextDom, this.findDom(key));
  }

  updateDom(element, key, container) {
    // const { dom } = this.createDom(element, key);

    // this.updateDomRender(container, dom);

    const dom = this.findDom(key);
    const prevProps = this.findElement(key).props;
    const nextProps = element.props
    this.updateDomProps(prevProps, nextProps, dom);
  }

  updateDomProps(prevProps, nextProps, dom) {
    // const dom = this.findDom(key);
    // const prevProps = this.findElement(key).props;
    // const nextProps = element.props
    
    const isEvent = key => 
      key.startsWith("on");
    const isDataset = key => 
      key === "dataset";
    const isProperty = key => 
      key !== "children" && !isEvent(key) && !isDataset(key);
    const isNew = (prev, next) => key => 
      prev[key] !== next[key]
    const isGone = (prev, next) => key =>
      !(key in next);

     Object.keys(prevProps)
      .filter(isEvent)
      .filter(key => 
        !(key in nextProps) || isNew(prevProps, nextProps)(key))
      .forEach(name =>{
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      })

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