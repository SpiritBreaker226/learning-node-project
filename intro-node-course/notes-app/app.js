const yargs = require('yargs')

const notes = require('./notes')

// Customise yargs version
yargs.version('1.1.0')

// add, remove, read, list

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: argv => (notes.add(argv.title, argv.body)),
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

yargs.parse()
