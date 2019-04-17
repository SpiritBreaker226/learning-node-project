const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Hoilday',
}

const bookJSON = JSON.stringify(book)
console.log(bookJSON)

const parsedData = JSON.parse(bookJSON)
console.log(parsedData.author)
