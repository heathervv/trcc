import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { validateAuth } from './auth/authApi'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isUserLoggedIn = validateAuth()

  return (
    <Route {...rest} render={props => (
      isUserLoggedIn
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
    )}/>
  )
}

export default AuthenticatedRoute
