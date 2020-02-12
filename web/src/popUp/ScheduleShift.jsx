import React from 'react'
import styled from 'styled-components'
import { Button, MainButton } from '../components/Button'

const Wrapper = styled.div`
  text-align: center;

  @media (min-width: 900px) {
    text-align: left;
  }
`

const
  ScheduleShift = ({ changeVisibility, validateRequestedShiftDetails, disableButtons }) => (
  <Wrapper>
    <MainButton onClick={validateRequestedShiftDetails} disabled={disableButtons}>Book shift</MainButton>
    <Button onClick={changeVisibility} disabled={disableButtons}>Cancel</Button>
  </Wrapper>
)

export default ScheduleShift
