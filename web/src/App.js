import React, { memo } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Calendar from './calendar'
import { ApiProvider } from './api/ApiContext'
import { SchedulePopUpProvider } from './schedulePopUp/SchedulePopUpContext'
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

// TODO: - setup login flow for /admin flow (stub out backend for now)
// - Create API that will validate authentication

const App = memo(() => (
  <BrowserRouter>
    <Wrapper>
      <ApiProvider>
        <SchedulePopUpProvider>

          <Switch>
            <Route path="/admin">
              <Calendar isAuthenticated />
            </Route>
            <Route path="/">
              <Calendar />
            </Route>
          </Switch>

          <SchedulePopUp />
        </SchedulePopUpProvider>
      </ApiProvider>
      <CancelShift />
    </Wrapper>
  </BrowserRouter>
))

export default App
