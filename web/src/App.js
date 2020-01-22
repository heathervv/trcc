import React, { memo } from 'react'
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

const App = memo(() => (
  <Wrapper>
    <ApiProvider>
      <SchedulePopUpProvider>
        <Calendar />
        <SchedulePopUp />
      </SchedulePopUpProvider>
    </ApiProvider>
    <CancelShift />
  </Wrapper>
))

export default App
