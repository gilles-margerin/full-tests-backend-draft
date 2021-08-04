import Fleet from "./Fleet.js";
import User from "./User.js";
import Vehicle from "./Vehicle.js";

export default class App {
  constructor() {
    this.users = {};
    this.fleets = {};
  }

  createUser(userId) {
    this.users[userId] = new User(userId);
    return this.users[userId];
  }

  createFleet(userId) {
    try {
      const user = this.users[userId];
      const fleet = new Fleet(userId);

      user.fleetsRefs.push(fleet.id);
      this.fleets[fleet.id] = fleet;

      return fleet.id;
    } catch (err) {
      throw `User ${userId} does not exists.`;
    }
  }

  registerVehicle(fleetId, plate) {
    const fleet = this.fleets[fleetId];

    function RegisterException(message) {
      this.message = message;
      this.name = "RegisterException";
    }

    try {
      if (fleet.vehicles[plate]) {
        throw new RegisterException("Vehicle already registered");
      } else {
        const vehicle = new Vehicle(plate);
        fleet.vehicles[plate] = vehicle;
        return vehicle;
      }
    } catch (err) {
      console.error(err.name, err.message);
      return err.message;
    }
  }

  parkVehicle(fleetId, plate, lng, lat, alt) {
    const fleet = this.fleets[fleetId];
    const vehicle = fleet.vehicles[plate];

    function ParkException(message) {
      this.message = message;
      this.name = "ParkException";
    }

    try {
      if (
        vehicle.parked === true &&
        vehicle.getParkLocation() === `${lng} ${lat} ${alt}`
      ) {
        throw new ParkException("Vehicle already parked here");
      } else {
        vehicle.parkAt(lng, lat, alt);
        return vehicle.getParkLocation();
      }
    } catch (err) {
      console.error(err.name, err.message);
      return err.message;
    }
  }
}
