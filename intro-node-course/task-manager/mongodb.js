const { MongoClient, ObjectID } = require('mongodb')

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
    // _id: new ObjectID('5cdcbac16a50e0b78b040f1a') or
    db.collection('users')
      .findOne({ name: 'Bob' },
        (error, user) => {
          if (error) {
            return console.log('Unable to Fetch')
          }

          console.log(user)
        }
      )

    db.collection('users')
      .find({ age: 30 })
      .toArray((error, users) => {
        if (error) {
          return console.log('Unable to Fetch Users')
        }

        console.log(users)
      })
  }
)
