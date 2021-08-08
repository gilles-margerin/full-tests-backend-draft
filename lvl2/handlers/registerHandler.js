import Vehicle from "../domain/Vehicle.js";

export default async function registerHandler(
  fleetId,
  plate,
  client,
  connection
) {
  try {
    const vehicle = new Vehicle({
      plate: plate,
      parked: false,
      lng: 0.0,
      lat: 0.0,
      alt: 0.0,
    });

    const db = await connection(client);
    await db.collection("fleets").findOneAndUpdate(
      { _id: Number(fleetId) },
      {
        $set: {
          [`vehicles.${plate}`]: vehicle,
        },
      },
      {
        upsert: true,
      }
    );

    console.log({
      registeredVehicle: plate,
    });
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}
