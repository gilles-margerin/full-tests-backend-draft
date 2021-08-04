export default class Vehicle {
  constructor(plate) {
    this.plate = plate;
    this.parked = false;
  }

  parkAt(lng, lat, alt = "0") {
    this.parked = true;
    this.lng = lng;
    this.lat = lat;
    this.alt = alt;
  }

  getParkLocation() {
    return `${this.lng} ${this.lat} ${this.alt}`
  }
}