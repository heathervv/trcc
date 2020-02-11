import React, { memo } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Calendar from './calendar'
import { CounsellorApiProvider } from './api/counsellors/CounsellorApiContext'
import { PopUpProvider } from './popUp/PopUpContext'
import Login from './api/auth/Login'
import PopUp from './popUp'
import CancelShift from './components/CancelShift'

const Wrapper = styled.div`
  @media(min-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const AuthCalendar = () => (
  <>
    <Calendar isAuthenticated/>
    <CancelShift/>
    <PopUp/>
  </>
)

const App = memo(() => (
  <BrowserRouter>
    <Wrapper>
      <CounsellorApiProvider>
        <PopUpProvider>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>

            <AuthenticatedRoute exact path="/admin" component={AuthCalendar}/>

            <Route path="/">
              <Calendar/>
              <CancelShift/>
              <PopUp/>
            </Route>
          </Switch>
        </PopUpProvider>
      </CounsellorApiProvider>
    </Wrapper>
  </BrowserRouter>
))

export default App
