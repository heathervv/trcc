export const login = (username, password) => {
  let headers = new Headers()
  headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`)

  return fetch(`/api/auth/login`, {
    method: "GET",
    headers
  })
    .then((response) => {
      if (response.status >= 400) { throw response }

      return response.json()
    })
    .then((parsedResponse) => {
      localStorage.setItem("token", parsedResponse)

      return parsedResponse.body
    })
    .catch((err) => { throw err })
}

export const validateAuth = () => {
  const token = localStorage.getItem("token")


  if (token) {
    let headers = new Headers()
    headers.set('user-token', token)

    return fetch(`/api/auth`, {
      method: "GET",
      headers
    })
      .then((response) => {
        if (response.status >= 400) { throw response }

        return response
      })
      .catch((err) => { throw err })
  }

  return false
}