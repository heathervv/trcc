import React, { memo } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import AuthenticatedRoute from './AuthenticatedRoute'
import Calendar from './calendar'
import { CounsellorApiProvider } from './counsellorApi/CounsellorApiContext'
import { SchedulePopUpProvider } from './schedulePopUp/SchedulePopUpContext'
import Login from './auth/Login'
import SchedulePopUp from './schedulePopUp'
import CancelShift from './CancelShift'

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
    <SchedulePopUp/>
  </>
)

const App = memo(() => (
  <BrowserRouter>
    <Wrapper>
      <CounsellorApiProvider>
        <SchedulePopUpProvider>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>

            <AuthenticatedRoute exact path="/admin" component={AuthCalendar}/>

            <Route path="/">
              <Calendar/>
              <CancelShift/>
              <SchedulePopUp/>
            </Route>
          </Switch>
        </SchedulePopUpProvider>
      </CounsellorApiProvider>
    </Wrapper>
  </BrowserRouter>
))

export default App
