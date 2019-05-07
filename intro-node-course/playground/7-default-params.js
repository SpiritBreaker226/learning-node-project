const user = {
  name: 'Jason',
  age: 27,
  location: 'Montreal',
}

const greeter = ({ name = 'World' } = {}) => {
  console.log(`Hello ${name}`)
}

greeter(user)
greeter()
