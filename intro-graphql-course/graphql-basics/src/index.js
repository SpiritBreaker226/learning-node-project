import location, { message, name, getGreeting } from './myModule'
import add, { subtract } from './math'

console.log(add(2, 3))
console.log(subtract(6, 5))

console.log(message)
console.log(name)
console.log(`default export ${location}`)
console.log(getGreeting('Lisa'))
