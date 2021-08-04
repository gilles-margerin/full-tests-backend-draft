export default class Fleet {
  constructor(userId) {
    this.id = Math.floor(Math.random()*(999999999-1+1)+1);
    this.vehicles = {};
    this.userId = userId;
  }

  getId() {
    return this.id;
  }

  getUserId() {
    return this.userId;
  }

  getVehicle(plate) {
    return this.vehicles[plate];
  }
}