export default class Vehicle {
  constructor(plate) {
    this.plate = plate;
  }

  setDetails(make, model, type = "Vehicle", year) {
    this.make = make;
    this.model = model;
    this.type = type;
    this.year = year;

  }

  getDetails() {
    return `${this.type} ${this.plate}, made by ${this.make ? this.make : "unknown brand"}, ${this.model ? `model ${this.model}` : "unknown model"} of ${this.year ? `${this.year} year` : "unknown year"}`
  } 

  setCoordinates(lat, lng, alt = "0") {
    this.lat = lat;
    this.lng = lng;
    this.alt = alt;
  }

  getCoordinates() {
    return `Latitude: ${this.lat}, longitude: ${this.lng}${this.alt ? `, altitude: ${this.alt}` : "."}`
  }
}