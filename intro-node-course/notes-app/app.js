const yargs = require('yargs')

// Customise yargs version
yargs.version('1.1.0')

// add, remove, read, list

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    }
  },
  handler: (argv) => console.log('Adding a new note!', argv),
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: () => console.log('Removing the note'),
})

yargs.command({
  command: 'list',
  describe: 'List yars notes',
  handler: () => console.log('Listing out all notes'),
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: () => console.log('Reading a note'),
})

console.log(yargs.argv)
