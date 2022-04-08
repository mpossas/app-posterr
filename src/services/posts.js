import { getCurrentUser } from './users'

const getPosts = () => JSON.parse(localStorage.getItem('posts')).sort((a, b) => b.id - a.id)

const userCantPost = () => {
  const posts = getPosts()
  const { id: currentUserId } = getCurrentUser()
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

export const getAllPosts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(getPosts())
    }, 500)
  })
}

export const getFollowedPosts = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const posts = getPosts()
      const { follows: followedUsers } = getCurrentUser()

      const followedPosts = posts.filter(post => followedUsers.includes(post.authorId))
      resolve(followedPosts)
    }, 500)
  })
}

export const getPost = id => {
  return new Promise(resolve => {
    setTimeout(() => {
      const posts = getPosts()
      const post = posts.find(post => post.id === id)
      resolve(post)
    }, 500)
  })
}

export const postMessage = message => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userCantPost()) {
        reject()
      } else {
        const posts = getPosts()
        const { id, username } = getCurrentUser()

        posts.push({
          id: Date.now(),
          type: 'post',
          author: username,
          authorId: id,
          content: message
        })

        localStorage.setItem('posts', JSON.stringify(posts))
        resolve()
      }
    }, 500)
  })
}
