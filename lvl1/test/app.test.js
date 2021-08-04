import { expect } from "chai";
import App from "../domain/App.js";

const app = new App()

describe("createUser", function () {
  it("creates a user", function () {
    expect(app.createUser("Bob Foobar")).to.eql({ id: "Bob Foobar", fleetsRefs: []});
  });
});

describe("createFleet", function () {
  it("creates a fleet for a given user", function () {
    expect(app.createFleet("Bob Foobar")).to.satisfy(function (num) {
      return num > 0 && num < 1000000000;
    });
  });
});

describe("registerVehicle", function () {
  it("records a vehicle in a given fleet", function () {
    expect(app.registerVehicle(app.users["Bob Foobar"].fleetsRefs[0], "66-TY-77")).to.eql(
      {
        plate: "66-TY-77",
        parked: false
      },
    );
  });
});

describe("registerSameVehicle", function () {
  it("returns an error for an already registered vehicle", function () {
    expect(app.registerVehicle(app.users["Bob Foobar"].fleetsRefs[0], "66-TY-77")).to.equal("Vehicle already registered")
  });
});

describe("parkVehicle", function() {
  it("set parking coordinates", function() {
    expect(app.parkVehicle(app.users["Bob Foobar"].fleetsRefs[0], "66-TY-77", "0.1", "0.2", "0.3")).to.equal("0.1 0.2 0.3")
  })
})

describe("parkSameVehicle", function() {  
  it("returns an error for an already parked vehicle", function() {
    expect(app.parkVehicle(app.users["Bob Foobar"].fleetsRefs[0], "66-TY-77", "0.1", "0.2", "0.3")).to.equal("Vehicle already parked here")
  })
})