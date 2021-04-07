import Model from './model/model.js';
import View from './view/view.js';
import Controller from './controller/controller.js';

class App {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  }
}

new App();
