const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNotes = notes.filter(note => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({ title, body })

    saveNotes(notes)

    console.log(`${title} Note Added!`)
  } else {
    console.log(`${title} is already in the notes`)
  }
}

const notes = () => 'Your notes...'

const removeNote = title => console.log(`Removing note ${title}`)

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
