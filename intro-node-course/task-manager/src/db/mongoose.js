const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://127.0.0.1:27017/task-manager-api',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
)

const User = mongoose.model(
  'User',
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a postive number')
        }
      }
    }
  }
)

const Task = mongoose.model(
  'Task',
  {
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
    }
  }
)
