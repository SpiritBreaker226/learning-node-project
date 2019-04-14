const chalk = require('chalk')
const notes = require('./notes')

const format = text => chalk.bold.inverse.green.bgRed(text)

const msg = notes()

console.log(msg)

console.log(format("Success!"))
