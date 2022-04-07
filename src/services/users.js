const getUsers = () => JSON.parse(localStorage.getItem('users'))

export const getCurrentUser = () => getUsers().find(user => user.loggedIn)
