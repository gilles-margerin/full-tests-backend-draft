export default class User {
  constructor(id) {
    this.id =  id ? id : Math.random().toString(36).substr(2);
    this.fleetsRefs = [];
  }

  getId() {
    return this.id;
  }
}
