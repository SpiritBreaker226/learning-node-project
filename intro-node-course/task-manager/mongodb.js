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

    db.collection('users')
      .updateOne({
        _id: new ObjectID('5ce1740601dee880d34591aa'),
      }, {
        $set: { age: 39 }
      })
      .then((result) => { console.log(result) })
      .catch((error) => { console.log('Unable to update') })
  }
)
