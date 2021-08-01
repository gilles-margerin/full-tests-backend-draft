import Vehicle from "./Vehicle.js";
import User from "./User.js";

const users = [];

const bob = new User("bob");
users.push(bob);

function createFleet(userId) {
  const user = users.find((user) => user.id === userId);

  user.setFleetId();
  return user.getFleetId();
}

function registerVehicle(fleetId, plate) {
  const fleet = users.find((user) => user.getFleetId() === fleetId).fleet;

  if (fleet.vehicles.find((vehicle) => vehicle.plate === plate)) {
    return "Vehicle already registered";
  } else {
    const vehicle = new Vehicle(plate);

    fleet.vehicles.push(vehicle);
    return fleet;
  }
}

function localizeVehicle(fleetId, plate, lat, lng, alt) {
  const fleet = users.find(user => user.getFleetId() === fleetId).fleet;
  const vehicle = fleet.vehicles.find(vehicle => vehicle.plate === plate);

  vehicle.setCoordinates(lat, lng, alt)
  return vehicle;
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
