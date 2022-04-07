const users = [
  {
    id: 1,
    username: 'possas',
    dateJoined: '2022-04-07T19:43:14.158Z',
    follows: [2, 3]
  },
  {
    id: 2,
    username: 'thehelpseaxylophone',
    dateJoined: '2022-04-06T19:43:14.158Z',
    follows: [1, 3]
  },
  {
    id: 3,
    username: 'thegoldrushpeaslime',
    dateJoined: '2022-04-05T19:43:14.158Z',
    follows: []
  },
  {
    id: 4,
    username: 'thegoldrushpeaslime',
    dateJoined: '2022-04-04T19:43:14.158Z',
    follows: [3]
  }
]

const posts = [
  {
    id: 1,
    type: 'post',
    author: 1,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae massa est. Curabitur euismod quam id sapien volutpat iaculis. Integer.',
    datePosted: '2022-04-07T19:48:46.356Z'
  },
  {
    id: 2,
    type: 'repost',
    author: 2,
    post: 1,
    datePosted: '2022-04-07T19:48:46.356Z'
  },
  {
    id: 3,
    type: 'quote',
    author: 3,
    post: 1,
    comment: 'Lorem ipsum dolor sit amet.',
    datePosted: '2022-04-07T19:48:46.356Z'
  },
]

export const initDatabase = () => {
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('posts', JSON.stringify(posts))
}
