class DynamicDom {

  currentDomList = [];
  nextDomList = [];

  currentElementList = [];
  nextElementList = [];

  constructor() {
    
  }

  static createElement(type, props, ...children) {
    return {
      type,
      props: {
      ...props,
      children: children? children.map(child => 
        typeof child === "object"
        ? child 
        : this.createTextElement(child)) 
        : []
      }
    }
  }

  static createTextElement(text) {
    return  {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    }
  }

  childCreateDom(element, container) {
    const dom = element.type == "TEXT_ELEMENT" 
      ? document.createTextNode("")
      : document.createElement(element.type);

    if(element.props) {
      const isProperty = key => key !== "children";
      Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name]
      })
    }

    element.props.children.forEach(child => 
      this.childCreateDom(child, dom)
    );

    container.appendChild(dom); 
  }

  createDom(element, key) {
    const dom = element.type == "TEXT_ELEMENT" 
      ? document.createTextNode("")
      : document.createElement(element.type);
  
    const isProperty = key => 
      key !== "children";
    Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  
    element.props.children.forEach(child => {
      this.childCreateDom(child, dom)
    });
  
    dom.addEventListener("click", ()=> {
      console.log("click")
    })
  
    dom.dataset.id = key
  
    this.nextDomList.push(dom);
    this.nextElementList.push(element);
     
  }

  //비교
  updateDom(currentDom, nextDom, container) {
    if(currentDom.equals(nextDom)) {
      console.log(nextDom)
      container.insertBefore(nextDomList, currentDom);
    } else {
      console.log("그냥 넘어감")
    }
  }

  updateDom2(currentDom, nextElement, id) {
    this.createDom(nextElement, id)
  }

  domRender(container) {
    this.nextDomList.forEach(nextDom => {
      console.log(nextDom);
      const currentDom = this.nextDomList.filter(currentDom => currentDom.id === nextDom)[0]
      if(currentDom) {
        this.updateDom(currentDom, nextDom, container);
      } else {
        container.appendChild(nextDom);
      }
    });
    this.currentDomList = this.nextDomList;
    this.currentElementList = this.nextElementList;
    console.log(this.nextElementList);

    //dom을 직접 비교하지 말고 엘리멘트를 비교 하자.
  }

  render(element, container, type) {
    switch (type) {
      case "UPDATE":
        console.log(element, container, type)
        break
      case "DELETE":
        console.log(element, container, type)
        break
      default:
        this.domRender(container)
        break
    }
  }

  // updateDomProps(dom) {

  // }

  // removeProperties(props, firstFilter, secondFilter, setMethod) {
  //   Object.keys(props)
  //     .filter(firstFilter)
  //     .filter(secondFilter)
  //     .forEach(setMethod);
  // }

  // updateDomProps(dom, prevProps, nextProps) {

  //   const isEvent = key => 
  //     key.startsWith("on");
  //   const isProperty = key => 
  //     key !== "children" && !isEvent(key);
  //   const isNew = (prev, next) => key => 
  //     prev[key] !== next[key]

  //   if(prevProps) {
  //     // Remove Evnet
  //     Object.keys(prevProps)
  //     .filter(isEvent)
  //     .filter(
  //       key => 
  //       !(key in nextProps) ||
  //       isNew(prevProps, nextProps)(key)
  //     )
  //     .forEach(name => {
  //       const eventType = name
  //         .toLowerCase()
  //         .substring(2)
  //       dom.removeEventListener(
  //         eventType,
  //         prevProps[name]
  //       )
  //     })

  //     // Remove old Properties
  //     Object.keys(prevProps)
  //       .filter(isProperty)
  //       .filter(isGone(prevProps, nextProps))
  //       .forEach(name => {
  //         dom[name]
  //       })
  //   }
    
  //}

}

export default DynamicDom;