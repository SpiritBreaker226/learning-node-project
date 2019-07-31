const users = []

const addUser = ({ socketId, username, room }) => {
  const newUsername = username.trim().toLowerCase()
  const newRoom = room.trim().toLowerCase()

  if (!username || !room) {
    return { error: 'Username and room are required!' }
  }

  const existingUser = users.find(user => (
    user.room === newRoom && user.username === newUsername
  ))

  if (existingUser) {
    return { error: 'Username is in use!' }
  }

  const newUser = {
    socketId,
    username: newUsername,
    room: newRoom,
  }

  users.push(newUser)

  return { user: newUser }
}

const removeUser = (socketId) => {
  const index = users.findIndex(user => user.socketId === socketId)

  if (index >= 0) {
    return users.splice(index, 1)[0]
  }

  return { error: 'User not found' }
}

module.exports = {
  addUser,
  removeUser,
}
