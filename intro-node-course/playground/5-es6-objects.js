// Object properly shorthand

const name = 'Jason'
const userAge =  27

const user = {
  name,
  age: userAge,
  location: 'Montreal',
}

console.log(user)

// Object destructuring

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
}

const { label: productName, stock, rating = 5} = product

console.log(productName)
console.log(stock)
console.log(rating)

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock)
}

transaction('order',  product)
