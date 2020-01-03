import React from 'react'
import styled from 'styled-components'
import { Button, BookShiftButton } from './CommonComponents'

const Wrapper = styled.div`
  text-align: center;

  @media (min-width: 900px) {
    text-align: left;
  }
`

const ScheduleShift = ({ changeVisibility, validateRequestedShiftDetails, disableButtons }) => (
  <Wrapper>
    <BookShiftButton onClick={validateRequestedShiftDetails} disabled={disableButtons}>Book shift</BookShiftButton>
    <Button onClick={changeVisibility} disabled={disableButtons}>Cancel</Button>
  </Wrapper>
)

export default ScheduleShift
