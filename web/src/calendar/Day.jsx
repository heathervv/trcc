import React, { memo } from 'react'
import styled from 'styled-components'
import Shifts from '../shifts'

const Wrapper = styled.div`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
  margin-bottom: -1px;
  background: ${props => props.blank ? '#eee' : '#fff'};

  &:first-child,
  &:nth-child(7n + 1) {
    border-left: 1px solid #000;
  }

  &:nth-child(7n + 1),
  &:nth-child(7n) {
    background: ${props => !props.blank && '#C6D9F1'};
  }
`

const Date = styled.p`
  font-size: 12px;
  font-weight: 600;
  padding: 5px;
`

const Day = memo(({ blank, dayOfMonth, filledShifts }) => (
  <Wrapper blank={blank}>
    { dayOfMonth && <Date>{dayOfMonth}</Date> }
    { !blank && <Shifts filledShifts={filledShifts} /> }
  </Wrapper>
))

export default Day
