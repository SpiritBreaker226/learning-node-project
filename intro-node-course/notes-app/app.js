const yargs = require('yargs')

// Customise yargs version
yargs.version('1.1.0')

// add, remove, read, list

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  handler: () => console.log('Adding a new note!'),
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: () => console.log('Removing the note'),
})



console.log(yargs.argv)
