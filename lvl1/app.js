import Vehicle from "./Vehicle.js";
import User from "./User.js";

const users = [];

function createUser(userId) {
  const user = new User(userId)

  users.push(user)
  return user.id;
}

function createFleet(userId) {
  const user = users.find((user) => user.id === userId);

  return user.getFleetId();
}

function registerVehicle(fleetId, plate) {
  const fleet = users.find((user) => user.getFleetId() === fleetId).fleet;

  if (fleet.vehicles.find((vehicle) => vehicle.plate === plate)) {
    return "Error: vehicle already registered";
  } else {
    const vehicle = new Vehicle(plate);

    fleet.vehicles.push(vehicle);
    return fleet.vehicles;
  }
}

function localizeVehicle(fleetId, plate, lat, lng, alt) {
  const fleet = users.find(user => user.getFleetId() === fleetId).fleet;
  const vehicle = fleet.vehicles.find(vehicle => vehicle.plate === plate);

  if (vehicle.parked) {
    return `Error: vehicle is already parked at longitude: ${vehicle.lng}, latitude: ${vehicle.lat}, altitude: ${vehicle.alt}`
  } else {
    vehicle.setCoordinates(lat, lng, alt)
    return `Vehicle parked at longitude: ${vehicle.lng}, latitude: ${vehicle.lat}, altitude: ${vehicle.alt}`;
  }
}

export { createUser, createFleet, registerVehicle, localizeVehicle }

console.log("user creation: ", createUser("Bob Foobar"))
console.log("fleet creation: ", createFleet("Bob Foobar"))
console.log("register vehicle: ", registerVehicle(users[0].getFleetId(), "88-gfh-46"))
console.log("register same vehicle: ", registerVehicle(users[0].getFleetId(), "88-gfh-46"))
console.log("park vehicle", localizeVehicle(users[0].getFleetId(), "88-gfh-46", "0.123", "0.456", "0.0008"))
console.log("park same vehicle", localizeVehicle(users[0].getFleetId(), "88-gfh-46", "0.123", "0.456", "0.0008"))
