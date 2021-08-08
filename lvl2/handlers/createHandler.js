import User from "../domain/User.js";
import Fleet from "../domain/Fleet.js";

export default async function createHandler(userId, client, connection) {
  try {
    const db = await connection(client);
    const user = await db.collection("users").findOne({ _id: userId });

    if (user) {
      const fleet = new Fleet({
        _id: Math.floor(Math.random() * (999999999 - 1 + 1) + 1),
        vehicles: new Map(),
        userId: userId,
      });
      
      await db.collection("users").updateOne({ _id: userId }, {
        $push : {
          fleetsRefs: fleet._id
        }
      })
      const result = await db.collection("fleets").insertOne(fleet);
      console.log(result)
    } else {
      const newUser = new User({
        _id: userId,
        fleetsRefs: [Math.floor(Math.random() * (999999999 - 1 + 1) + 1)],
      });

      const fleet = new Fleet({
        _id: newUser.fleetsRefs[0],
        vehicles: new Map(),
        userId: userId,
      });
  
      const result = await db.collection("users").insertOne(newUser);
      const result2 = await db.collection("fleets").insertOne(fleet);
      console.log(result, result2)
    }
    /* const user = new User({
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
    }); */
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    await client.close();
  }
}
