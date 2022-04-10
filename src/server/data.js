import { axiosMock } from "./api"

const users = [
  {
    id: 1649381118880,
    username: 'possas',
    loggedIn: true,
    follows: [1649381177650, 1649547730535]
  },
  {
    id: 1649381177650,
    username: 'thehelpseaxy',
    loggedIn: false,
    follows: [1649381118880, 1649547730535]
  },
  {
    id: 1649547730535,
    username: 'thegoldrush',
    loggedIn: false,
    follows: []
  },
  {
    id: 1649615676363,
    username: 'thegraduatebee',
    loggedIn: false,
    follows: [1649547730535]
  }
]

const posts = [
  {
    id: 1649381118880,
    type: 'post',
    author: 'possas',
    authorId: 1649381118880,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae massa est. Curabitur euismod quam id sapien volutpat iaculis. Integer.'
  },
  {
    id: 1649381177650,
    type: 'repost',
    author: 'thehelpseaxy',
    authorId: 1649381177650,
    originalPostId: 1649381118880
  },
  {
    id: 1649381190537,
    type: 'quote',
    author: 'thegoldrush',
    authorId: 1649547730535,
    originalPostId: 1649381118880,
    comment: 'Lorem ipsum dolor sit amet.'
  },
  {
    id: 1649615714810,
    type: 'post',
    author: 'thegraduatebee',
    authorId: 1649615676363,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae massa est.'
  }
]

export const initData = () => {
  if (localStorage.getItem('users') && localStorage.getItem('posts')) {
    return
  }

  axiosMock.put('/users', users)
  axiosMock.put('/posts', posts)
}
