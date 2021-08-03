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

function localizeVehicle(fleetId, plate, lng, lat, alt) {
  const fleet = users.find(user => user.getFleetId() === fleetId).fleet;
  const vehicle = fleet.vehicles.find(vehicle => vehicle.plate === plate);

  if (vehicle.parked) {
    return `Error: vehicle is already parked at longitude: ${vehicle.lng}, latitude: ${vehicle.lat}, altitude: ${vehicle.alt}`
  } else {
    vehicle.setCoordinates(lat, lng, alt)
    return `Vehicle parked at longitude: ${vehicle.lng}, latitude: ${vehicle.lat}, altitude: ${vehicle.alt}`;
  }
}

export { createUser, createFleet, registerVehicle, localizeVehicle, Vehicle, User, users }

