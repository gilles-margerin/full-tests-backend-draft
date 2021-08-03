import Vehicle from "./Vehicle.js";
import User from "./User.js";

const users = [];

const bob = new User("bob");
users.push(bob);

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

console.log("fleet id: ", createFleet(bob.getId()));
console.log(
  "register vehicle: ",
  registerVehicle(bob.getFleetId(), "88-zz-99")
);
console.log(
  "register vehicle: ",
  registerVehicle(bob.getFleetId(), "88-zz-99")
);
console.log(
  "localize vehicle: ",
  localizeVehicle(bob.getFleetId(), "88-zz-99", "0.1456", "0.157897")
)
console.log(
  "localize vehicle: ",
  localizeVehicle(bob.getFleetId(), "88-zz-99", "0.1456", "0.157897")
)



//export { bob, createFleet, registerVehicle}