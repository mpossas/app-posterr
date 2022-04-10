import { axiosMock } from '~/server/api'

const getUsers = async () => {
  const users = await axiosMock.get('/users')
  return JSON.parse(users)
}

const saveUser = async newUserData => {
  const users = await getUsers()
  const currentUserData = users.find(user => user.id === newUserData.id)
  users.splice(users.indexOf(currentUserData), 1)
  users.push(newUserData)

  return axiosMock.put('/users', users)
}

export const getCurrentUser = async () => {
  const users = await getUsers()
  return users.find(user => user.loggedIn)
}

export const getUser = async id => {
  const users = await getUsers()
  return users.find(user => user.id === id)
}

export const getUserFollowers = async id => {
  const users = await getUsers()
  const followers = users.reduce((total, { follows }) => {
    const follower = follows.includes(id)
    return total + follower
  }, 0)
  return followers
}

export const followUser = async id => {
  const currentUser = await getCurrentUser()
  currentUser.follows.push(id)

  return saveUser(currentUser)
}

export const unfollowUser = async id => {
  const currentUser = await getCurrentUser()
  currentUser.follows.splice(currentUser.follows.indexOf(id), 1)

  return saveUser(currentUser)
}
