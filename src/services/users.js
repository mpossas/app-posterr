import { axiosMock } from '~/server/api'

const getUsers = async () => {
  const users = await axiosMock.get('/users')
  return JSON.parse(users)
}

export const getCurrentUser = async () => {
  const users = await getUsers()
  return users.find(user => user.loggedIn)
}
