const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  if (!duplicateNote) {
    notes.push({ title, body })

    saveNotes(notes)

    console.log(chalk.green.inverse(`${title} Note Added!`))
  } else {
    console.log(chalk.red.inverse(`${title} is already in the notes`))
  }
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.bold.cyan.inverse('Your Notes'))

  notes.forEach(note => {
    console.log(chalk.bgBlack.bold.white.inverse(note.title))
  })
}

  notes.forEach(note => {
    const title = chalk.bgBlack.bold.white.inverse(note.title)
    const body = chalk.bgBlack.white.inverse(note.body)

    console.log(`${title}\n${body}\n\n`)
  })
}

const notes = () => 'Your notes...'

const removeNote = (title) => {
  const notes = loadNotes()

  const remainingNotes = notes.filter(note => note.title !== title)

  if (notes.length > remainingNotes.length) {
    saveNotes(remainingNotes)

    console.log(chalk.green.inverse(`Removing note ${title}`))
  } else {
    console.log(chalk.red.inverse(`No Note Found`))
  }
}

// Private Functions

const loadNotes = () => {
  try {
    const dataBuffer =  fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()

    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)

  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  add: addNote,
  list: listNotes,
  notes,
  remove: removeNote,
}
