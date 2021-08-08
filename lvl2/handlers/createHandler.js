import User from "../domain/User.js";
import Fleet from "../domain/Fleet.js";

export default async function createHandler(userId, client, connection) {
  try {
    const user = new User({
      _id: userId,
      fleetsRefs: [Math.floor(Math.random() * (999999999 - 1 + 1) + 1)],
    });

    const fleet = new Fleet({
      _id: user.fleetsRefs[0],
      vehicles: new Map(),
      userId: userId,
    });

    const db = await connection(client);
    const newUser = await db.collection("users").insertOne(user);
    await db.collection("fleets").insertOne(fleet);

    console.log({
      userCreated: newUser.insertedId,
      defaultFleetId: user.fleetsRefs[0],
    });
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}