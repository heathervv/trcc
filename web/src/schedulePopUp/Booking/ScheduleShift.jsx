import React from 'react'
import styled from 'styled-components'
import { Button, MainActionButton } from '../CommonComponents'

const Wrapper = styled.div`
  text-align: center;

  @media (min-width: 900px) {
    text-align: left;
  }
`

const ScheduleShift = ({ changeVisibility, validateRequestedShiftDetails, disableButtons }) => (
  <Wrapper>
    <MainActionButton onClick={validateRequestedShiftDetails} disabled={disableButtons}>Book shift</MainActionButton>
    <Button onClick={changeVisibility} disabled={disableButtons}>Cancel</Button>
  </Wrapper>
)

export default ScheduleShift
