class Observer {
  constructor() {
    this.list = {};
  }

  subscribe(eventName, context, callback) {
    if (!this.list[eventName]) {
      this.list[eventName] = [];
    }
    this.list[eventName].push({
      context,
      callback,
    });
    console.log(`somebody subscribed for '${name}' event`);
    console.log(this.list);
  }
  // eventName, context, callback을 받아서 등록

  unsubscribe(eventName, context, callback) {
    if (!this.list[eventName]) return;
    const index = this.list[eventName].findIndex(
      (ele) => ele.context === context && ele.callback === callback
    );
    if (index === -1) return;
    this.list[eventName].splice(index, 1);
  }
  // 객체(context)의 구독을 해지한다.

  notify(eventName, data) {
    if (!this.list[eventName]) return;
    console.log(`observer is notifying for '${eventName}' evnet`);
    this.list[name].forEach((ele) => ele.callback(data));
  }
}

export default Observer;
