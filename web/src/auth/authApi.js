export const login = (username, password) => {
  let headers = new Headers()
  headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)

  return fetch(`/api/auth/login`, {
    method: "GET",
    headers
  })
    .then((response) => {
      console.log('we logged the user in!', response)

      localStorage.setItem("username", username)
      localStorage.setItem("password", password)

      return response
    })
}

export const validateAuth = () => {
  const username = localStorage.getItem("username")
  const password = localStorage.getItem("password")

  if (username && password) {
    let headers = new Headers()
    headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)

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