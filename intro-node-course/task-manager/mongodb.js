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
    const data = {
      name: 'Jason',
      age: 30,
    }

    db.collection('users')
      .insertOne(data, (error, result) => {
        if (error) {
          return console.log('Unable to intert user')
        }

        console.log(result.ops)
      })
  }
)
