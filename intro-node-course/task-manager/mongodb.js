const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('tasks')
      .insertMany([
        {
          description: 'Add insertMany',
          completed: false,
        },
        {
          description: 'Add Fields',
          completed: true,
        },
        {
          description: 'Run Script',
          completed: false,
        },
      ], (error, result) => {
        if (error) {
          console.log('Unable to insert task')
        }

        console.log(result.ops)
      })
  }
)
