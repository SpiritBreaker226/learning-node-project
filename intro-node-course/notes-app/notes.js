const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()

  console.log(notes)
}

const notes = () => 'Your notes...'

const loadNotes = () => {
  try {
    const dataBuffer =  fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()

    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  add: addNote,
  notes,
}
