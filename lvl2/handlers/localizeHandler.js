export default async function localizeHandler(fleetId, plate, lng, lat, alt, client, connection) {
  try {
    const db = await connection(client);
    const fleet = await db.collection("fleets");

    const result = await fleet.updateOne(
      {
        _id: Number(fleetId),
      },
      [
        {
          $set: {
            [`vehicles.${plate}`]: {
              lng: {
                $cond: {
                  if: {
                    notSame: { $ne: ["$lng", lng] },
                  },
                  then: lng,
                  else: "$lng",
                },
              },
              lat: {
                $cond: {
                  if: {
                    notSame: { $ne: ["$lat", lat] },
                  },
                  then: lat,
                  else: "$lat",
                },
              },
              alt: {
                $cond: {
                  if: {
                    notSame: { $ne: ["$alt", alt] },
                  },
                  then: alt,
                  else: "$alt",
                },
              },
            },
          },
        },
      ]
    );

    if (result.modifiedCount === 0) {
      throw "Vehicule already parked here";
    } else {
      console.log("Vehicule parked");
      return;
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}
