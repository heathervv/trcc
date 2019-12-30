import React, { memo } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 125px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
  margin-bottom: -1px;
  background: ${props => props.blank ? '#eee' : '#fff'}

  &:first-child,
  &:nth-child(7n + 1) {
    border-left: 1px solid #000;
  }
`

const Date = styled.p`
  font-size: 12px;
  padding: 5px;
`

const Day = memo(({ blank, date }) => (
  <Wrapper blank={blank}>
    { date && <Date>{date}</Date> }
  </Wrapper>
))

export default Day
