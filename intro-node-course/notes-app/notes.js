const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNotes = notes.filter(note => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({ title, body })

    saveNotes(notes)

    console.log(chalk.green.inverse(`${title} Note Added!`))
  } else {
    console.log(chalk.red.inverse(`${title} is already in the notes`))
  }
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
  notes,
  remove: removeNote,
}
