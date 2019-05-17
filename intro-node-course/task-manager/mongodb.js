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

    db.collection('tasks')
      .findOne(
        { _id: new ObjectID('5cdcb2ebf275acb1e1958246') },
        (error, task) => {
          if (error) {
            return console.log('Unable to Fetch')
          }

          console.log(task)
        }
      )

    db.collection('tasks')
      .find({ completed: false })
      .toArray((error, tasks) => { console.log(tasks) })
  }
)
