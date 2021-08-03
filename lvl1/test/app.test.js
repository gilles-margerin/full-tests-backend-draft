import { expect } from "chai";
import {
  createUser,
  createFleet,
  registerVehicle,
  localizeVehicle,
  users
} from "../app.js";

createUser("Bob Foobar")
let fleetId = createFleet("Bob Foobar");
registerVehicle(users[0].getFleetId(), "88-gfh-46")


describe("createUser", function () {
  it("creates a user", function () {
    expect(createUser("Bob Foobar")).to.equal("Bob Foobar");
    expect(createUser("Alice Baz")).to.equal("Alice Baz");
  });
});

describe("createFleet", function () {
  it("creates a fleet for a given user", function () {
    expect(fleetId).to.satisfy(function (num) {
      return num > 0 && num < 1000000000;
    });
  });
});

describe("registerVehicle", function () {
  it("records a vehicle in a given fleet", function () {
    expect(registerVehicle(fleetId, "66-TY-77")).to.eql([
      {
        plate: "88-gfh-46",
      },
      {
        plate: "66-TY-77",
      },
    ]);
  });
});

describe("registerSameVehicle", function () {
  it("returns an error for an already registered vehicle", function () {
    expect(registerVehicle(fleetId, "66-TY-77")).to.equal("Error: vehicle already registered")
  });
});

describe("localizeVehicle", function() {
  it("set parking coordinates", function() {
    expect(localizeVehicle(fleetId, "66-TY-77", "0.1", "0.2", "0.3")).to.equal("Vehicle parked at longitude: 0.1, latitude: 0.2, altitude: 0.3")
  })
})

describe("localizeSameVehicle", function() {  
  it("returns an error for an already parked vehicle", function() {
    expect(localizeVehicle(fleetId, "66-TY-77", "0.1", "0.2", "0.3")).to.equal("Error: vehicle is already parked at longitude: 0.1, latitude: 0.2, altitude: 0.3")
  })
})