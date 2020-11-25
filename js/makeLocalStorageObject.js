export default class makeLocalStorageObject {
  constructor(id, value) {
    this.id = 0;
    this.value = "";
  }

  getId() {
    return id;
  }

  getValue() {
    return value;
  }

  setId(id) {
    this.id = id;
  }
  setValue(value) {
    this.value = value;
  }

  toString() {
    console.log(this);
  }
}
