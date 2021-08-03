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
    return `${this.type} ${this.plate} ${this.make ? ` made by ${this.make}` : ""}${this.model ? ` model ${this.model}` : ""}${this.year ? ` of ${this.year} year` : ""}`
  } 

  setCoordinates(lat, lng, alt = "0") {
    this.parked = true;
    this.lat = lat;
    this.lng = lng;
    this.alt = alt;
  }

  getCoordinates() {
    return `Latitude: ${this.lat}, longitude: ${this.lng}${this.alt ? `, altitude: ${this.alt}` : "."}`
  }
}