function Store() {
  //item = {id, title, isDone}
  this.items = [];

  this.push = function (item) {
    this.items.push(item);
  };

  this.toggle = function (id) {
    const item = this.items.find((item) => equalTo(item, id));
    item.isDone = !item.isDone;
  };

  this.destroy = function (id) {
    this.items = this.items.filter((item) => notEqualTo(item, id));
  };

  this.edit = function (id, title) {
    const item = this.items.find((item) => equalTo(item, id));
    item.title = title;
  };

  this.getAllItems = function () {
    return this.items;
  };

  this.getActiveItems = function () {
    return this.items.filter((item) => item.isDone === false);
  };

  this.getCompletedItems = function () {
    return this.items.filter((item) => item.isDone === true);
  };

  function equalTo(item, id) {
    return parseInt(item.id) === parseInt(id);
  }

  function notEqualTo(item, id) {
    return parseInt(item.id) !== parseInt(id);
  }
}

export const $store = new Store();
