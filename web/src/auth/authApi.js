// TODO connect the auth api to, y'know, an actual API

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    console.log('attempting to login with:', username, password)

    resolve('success!')
  })
}

export const validateAuth = () => {
  console.log('is the user logged in')

  return true
}