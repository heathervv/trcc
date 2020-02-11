import React, { useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { MainButton } from '../../components/Button'
import { login } from './authApi'
import Error from '../../components/Error'

const Wrapper = styled.div`
  width: 100%;
  @media(min-width: 900px) {
    margin: 35px;
  }
`

const Form = styled.div`
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  padding: 35px;
  border: 1px solid #c3c3c3;
  border-radius: 3px;
`

const Block = styled.div`
  margin: 5px 0;
`

const Heading = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`

const Field = styled.div`
  display: block;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
`

const Input = styled.input`
  display: block;
  width: 100%;
  border-radius: 3px;
  padding: 10px;
  border: 1px solid #c3c3c3;
  margin-bottom: 20px;
  
  &:focus {
    box-shadow: 1px 1px 5px rgba(0,0,0,.2);
  }
`

const Login = ({ history }) => {
  const [username, updateUsername] = useState('')
  const [password, updatePassword] = useState('')
  const [status, updateStatus] = useState(null)

  const submitLogin = useCallback(() => {
    login(username, password)
      .then((response) => {
        updateUsername('')
        updatePassword('')

        history.push('/admin')
      })
      .catch(() => {
        updateUsername('')
        updatePassword('')
        updateStatus('failed')
      })
  }, [username, password, history])

  const keyPressSubmit = (keyCode) => {
    switch (keyCode) {
      case 'Enter':
        submitLogin()
      break;
      default:
      break;
    }
  }

  return (
    <Wrapper>
      <Form>
        <Block>
          <Heading>Login</Heading>
        </Block>
        <Block>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => updateUsername(e.target.value)}
              onKeyPress={(e) => keyPressSubmit(e.key)}
            />
          </Field>
        </Block>
        <Block>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
              onKeyPress={(e) => keyPressSubmit(e.key)}
            />
          </Field>
        </Block>

        {
          status === 'failed' &&
          <Block>
            <Error>Login failed! Please try again.</Error>
          </Block>
        }

        <MainButton onClick={submitLogin}>Login</MainButton>
      </Form>
    </Wrapper>
  )
}

export default withRouter(Login)
