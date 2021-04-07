import DB from '../db.js';

export default class Model {
  constructor() {
    this.stroage = new DB();
    console.log('Model was created');
  }
}
