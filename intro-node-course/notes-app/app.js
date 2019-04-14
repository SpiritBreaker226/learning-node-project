const fs = require('fs')

const filename = 'notes.txt'

fs.writeFileSync(filename, 'My name is Jason.')

fs.appendFileSync(filename, '\nLast Name: Stathopulos')

fs.appendFileSync(filename, '\n')
