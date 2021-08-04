export default async function connection(client) {
  try {
    await client.connect();
    const db = client.db();
   
    console.log(`Connected to db: ${db.databaseName}`)
    return db;
  } catch(err) {
    console.log(err)
  }
}