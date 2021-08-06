import App from "../domain/App.js";

const app = new App();

// exposing app
const aliceUser = app.createUser("Alice Foobaz");
const aliceDefaultFleet = app.createFleet(aliceUser.id);
const aliceVehicle = app.registerVehicle(aliceDefaultFleet, "123-XY-456");
const aliceParkLocation = app.parkVehicle(aliceDefaultFleet, "123-XY-456", "45.89", "12.78", "1250")

console.log({
  userCreation: aliceUser,
  fleetCreation: aliceDefaultFleet,
  registerVehicule: aliceVehicle,
  parkVehicle: aliceParkLocation
})

export default app;


