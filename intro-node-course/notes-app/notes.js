const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()

  notes.push({ title, body })

  saveNotes(notes)

  console.log(notes)
}

const notes = () => 'Your notes...'

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
}
