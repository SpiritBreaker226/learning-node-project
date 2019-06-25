const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
} = require('../src/math')

test('should calculate total with tip', () => {
  const total = calculateTip(10, .3)

  expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)

  expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {
  const temporary = fahrenheitToCelsius(32, 0)

  expect(temporary).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
  const temporary = celsiusToFahrenheit(0, 32)

  expect(temporary).toBe(32)
})

