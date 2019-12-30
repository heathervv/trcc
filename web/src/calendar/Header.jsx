import React, { memo } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const TitleWrapper = styled.div`
  background: #C6D9F1;
  padding: 15px;
  text-align: center;
  border: 1px solid #000;
`

const Title = styled.h1`
  font-size: 18px;
  letter-spacing: 2px;
`

const Date = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin-top: 10px;
`

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

const Weekday = styled.div`
  background: #365F91;
  color: #FFF;
  text-transform: uppercase;
  padding: 5px;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  border-right: 1px solid #000;

  &:first-child {
    border-left: 1px solid #000;
  }
`

const Header = memo(({ date }) => (
  <>
    <TitleWrapper>
      <Title>Crisis Line Schedule</Title>
      <Date>{date.format("MMMM Y")}</Date>
    </TitleWrapper>
    <Weekdays>
      {
        moment.weekdays().map((weekday) => (
          <Weekday key={weekday}>{weekday}</Weekday>
        ))
      }
    </Weekdays>
  </>
))

export default Header
