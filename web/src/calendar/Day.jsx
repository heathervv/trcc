import React, { memo } from 'react'
import styled from 'styled-components'
import Shifts from '../shifts'
import Ebu from "../ebu"

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

const DayHeader = styled.div`
  display: flex;
  align-items: center;
`

const Date = styled.p`
  font-size: 12px;
  font-weight: 600;
  padding: 5px;
`

const Day = memo(({ blank, possibleScheduledPeople, date, isAuthenticated }) => {
  return (
    <Wrapper blank={blank}>
      {
        date &&
        <>
          <DayHeader>
            <Date>{date.format("D")}</Date>
            <Ebu
              people={possibleScheduledPeople ? possibleScheduledPeople.ebus : null}
              isAuthenticated={isAuthenticated}
            />
          </DayHeader>
          <Shifts
            filledShifts={possibleScheduledPeople ? possibleScheduledPeople.shifts : null}
            date={date}
            isAuthenticated={isAuthenticated}
          />
        </>
      }
    </Wrapper>
  )
})

export default Day
