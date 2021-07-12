const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017'

let database = null

async function connect() {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect()
    const db = await client.db('entertainme')

    database = db
    return db
  } catch (error) {
    console.log(error);
  }
}

function getDatabase() {
  return database
}

module.exports = {
  connect, getDatabase
}