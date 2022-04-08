export const axiosMock = {
  get: endpoint => {
    return new Promise(resolve => {
      setTimeout(() => {
        const api = {
          '/posts': () => localStorage.getItem('posts'),
          '/users': () => localStorage.getItem('users')
        }
        resolve(api[endpoint]())
      }, 200)
    })
  },
  put: async (endpoint, data) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const api = {
          '/posts': () => { localStorage.setItem('posts', JSON.stringify(data)) },
          '/users': () => { localStorage.setItem('users', JSON.stringify(data)) }
        }
        api[endpoint]()
        resolve()
      }, 200)
    })
  }
}
