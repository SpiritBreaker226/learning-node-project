const doWork = async () => {
  throw new Error('Something went wrong')
  return 'Jason'
}

doWork()
  .then((result) => {
    console.log('result', result)
  })
  .catch((error) => {
    console.log('Error', error)
  })
