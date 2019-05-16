const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

console.log(`ObjectID ID ${id}`)
console.log('ObjectID Timestamp: ', id.getTimestamp())
console.log('ObjectID Hash ', id.id)
console.log(`ObjectID Size ${id.id.length}`)
console.log(`What is Being Stored for ObjectID ${id.toHexString().length}`)

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('tasks')
    //   .insertMany([
    //     {
    //       description: 'Add insertMany',
    //       completed: false,
    //     },
    //     {
    //       description: 'Add Fields',
    //       completed: true,
    //     },
    //     {
    //       description: 'Run Script',
    //       completed: false,
    //     },
    //   ], (error, result) => {
    //     if (error) {
    //       console.log('Unable to insert task')
    //     }

    //     console.log(result.ops)
    //   })
  }
)
