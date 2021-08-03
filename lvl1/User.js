export default class User {
  constructor(id) {
    this.id =  id ? id : Math.random().toString(36).substr(2);
    this.fleet = {
      id: Math.random().toString(10).substr(10),
      vehicles: []
    }
  } 

  getFleetId() {
    return this.fleet.id;
  }

  getFleet() {
    return this.fleet.vehicles;
  }

  getId() {
    return this.id;
  }
}
