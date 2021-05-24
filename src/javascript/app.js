import Model from './model/model.js';
import View from './view/view.js';
import Controller from './controller/controller.js';
import DB from './db.js';

// NOTE: userNames 는 이후의 과제를 고려해서 작성해둠.
// TODO: 이후 userNames 는 localStorages에서 `userNames` 키로 가져오기
class App {
  constructor() {
    location.href = '#';
    this.storages = {};
    this.userNames = ['default', 'test', 'test2'];
    this.userNames.map((name) => {
      this.storages[name] = new DB(name);
    });
    this.model = new Model(this.storages);
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  }
}

new App();
