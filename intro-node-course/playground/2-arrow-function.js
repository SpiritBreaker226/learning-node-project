// Function Style

const square = function (x) {
  return x * x
}

const event = {
  name: 'Birthday Party',
  printGustList() {
    console.log(`Guest list for ${this.name}`)
  }
}

event.printGustList()

// Arrow Functions

const willReturnMutipleLinesAndTwoOrMoreArg = (x, y) => {
  const grid = x * y

  return willReturnSingleLineAndSingleArg(grid)
}

// Arrow Function Short Term Syntax

// Returning a single line and argument
const willReturnSingleLineAndSingleArg = x => x * x

// Not returning a single line and argument
const willNotReturnSingleLineAndSingleArg = x => (x * x)

// Not returning a single line and 2 or more arguments
const willNotReturnSingleLineAndTwoOrMoreArg = (x, y) => (x * y)

// Returning a single line and 2 or more arguments
const willReturnSingleLineAndTwoOrMoreArg = (x, y) => x * y

console.log(square(2))
console.log(willReturnSingleLineAndSingleArg(3))
console.log(willNotReturnSingleLineAndSingleArg(4))
console.log(willNotReturnSingleLineAndTwoOrMoreArg(5, 6))
console.log(willReturnSingleLineAndTwoOrMoreArg(7, 8))
console.log(willReturnMutipleLinesAndTwoOrMoreArg(9, 0))
