import Vehicle from "../domain/Vehicle.js";

export default async function registerHandler(fleetId, plate, client, connection) {
  try {
    const vehicle = new Vehicle({
      plate: plate,
      parked: false,
      lng: 0.000,
      lat: 0.000,
      alt: 0.000
    });

    const db = await connection(client);
    const result = await db.collection("fleets").findOneAndUpdate(
      { _id: Number(fleetId) },
      {
        $set: {
          [`vehicles.${plate}`]: vehicle
        },
      },
      {
        upsert: true
      }
    );

    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}