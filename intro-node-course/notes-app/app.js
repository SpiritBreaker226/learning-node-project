const validator = require('validator')
const notes = require('./notes')

const msg = notes()

console.log(msg)

console.log(`is Email: Valid: ${validator.isEmail('jason@email.com')}`)
console.log(`is Email: Valid: ${validator.isEmail('@email.com')}`)
console.log(`is URL: Valid: ${validator.isURL('http://jstats.me')}`)
console.log(`is URL: Valid: ${validator.isURL('http:jstats.me')}`)
