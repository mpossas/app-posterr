import { axiosMock } from '~/server/api'

const getUsers = async () => {
  const users = await axiosMock.get('/users')
  return JSON.parse(users)
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
