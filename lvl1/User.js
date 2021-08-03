export default class User {
  constructor(id) {
    this.id =  id ? id : Math.random().toString(36).substr(2);
    this.fleet = {
      id: Math.floor(Math.random()*(999999999-1+1)+1),
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
