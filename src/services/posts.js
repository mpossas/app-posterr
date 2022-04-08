import { getCurrentUser } from './users'
import { axiosMock } from '~/server/api'

const getPosts = async () => {
  const posts = await axiosMock.get('/posts')
  return JSON.parse(posts)
}

const userCantPost = async () => {
  const posts = await getPosts()
  const { id: currentUserId } = await getCurrentUser()
  const today = new Date().getDay()

  const postsToday = posts.reduce((total, { id: postId, authorId }) => {
    const datePosted = new Date(postId)
    const postedToday = datePosted.getDay() === today
    const currentUserIsAuthor = currentUserId === authorId
    const increment = currentUserIsAuthor && postedToday

    return total + increment
  }, 0)

  return postsToday === 5
}

const savePost = async post => {
  if (await userCantPost()) {
    throw new Error()
  } else {
    const posts = await getPosts()
    const { id, username } = await getCurrentUser()

    posts.push({
      id: Date.now(),
      author: username,
      authorId: id,
      ...post
    })

    return axiosMock.put('/posts', posts)
  }
}

const sortPosts = posts => posts.sort((a, b) => b.id - a.id)

export const getAllPosts = async () => {
  const posts = await getPosts()

  return sortPosts(posts)
}

export const getFollowedPosts = async () => {
  const posts = await getPosts()
  const { follows: followedUsers } = await getCurrentUser()
  const followedPosts = posts.filter(post => followedUsers.includes(post.authorId))

  return sortPosts(followedPosts)
}

export const getPost = async id => {
  const posts = await getPosts()
  const post = posts.find(post => post.id === id)

  return post
}

export const postMessage = message => {
  const post = {
    type: 'post',
    content: message
  }

  return savePost(post)
}

export const repostMessage = originalPostId => {
  const post = {
    type: 'repost',
    originalPostId
  }

  return savePost(post)
}

export const quotePost = (originalPostId, comment) => {
  const post = {
    type: 'quote',
    originalPostId,
    comment
  }

  return savePost(post)
}
