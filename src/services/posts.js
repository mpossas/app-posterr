import { getCurrentUser } from './users'

const getPosts = () => JSON.parse(localStorage.getItem('posts'))

export const getAllPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getPosts())
    }, 500)
  })
}

export const getFollowedPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getPosts()
      const { follows: followedUsers } = getCurrentUser()

      const followedPosts = posts.filter(post => followedUsers.includes(post.authorId))
      resolve(followedPosts)
    }, 500)
  })
}

export const getPost = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = JSON.parse(localStorage.getItem('posts'))
      const post = posts.find(post => post.id = id)
      resolve(post)
    }, 500)
  })
}
