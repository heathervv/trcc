export const login = (username, password) => {
  let headers = new Headers()
  headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)

  return fetch(`/api/auth/login`, {
    method: "GET",
    headers
  })
    .then((response) => {
      console.log('we logged the user in!', response)

      localStorage.setItem("token", response)

      return response
    })
}

export const validateAuth = () => {
  const token = localStorage.getItem("user-token")

  if (token) {
    let headers = new Headers()
    headers.set('user-token', token)

    return fetch(`/api/auth`, {
      method: "GET",
      headers
    })
      .then((response) => {
        console.log('user is in fact logged in!', response)

        return response
      })
  }

  return false
}