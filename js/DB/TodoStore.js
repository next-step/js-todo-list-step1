function Store() {
  //item = {id, title, isDone}
  this.items = [];

  this.push = function (item) {
    if (isEmpty(item.title)) {
      return;
    }
    this.items.push(item);
  };

  this.toggle = function (id) {
    const item = this.items.find((item) => equalTo(item, id));
    item.isDone = !item.isDone;
  };

  function equalTo(item, id) {
    return parseInt(item.id) === parseInt(id);
  }

  this.destroy = function (id) {
    this.items = this.items.filter((item) => !equalTo(item, id));
  };

  this.edit = function (id, title) {
    const item = this.items.find((item) => equalTo(item, id));
    item.title = title;
  };

  function isEmpty(title) {
    return !title || /^\s*$/.test(title);
  }
}

export const $store = new Store();
