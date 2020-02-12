import React, { memo } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Wrapper = styled.ul`
  padding: 20px;
  border-radius: 5px;
  background: #eee;
  margin-bottom: 20px;

  @media (min-width: 900px) {
    margin-right: 15px;
    margin-bottom: 0;
  }
`

const Item = styled.li`
  display: block;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`

const Heading = styled.span`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
`

const ShiftDetails = memo(({ selectedShift }) => {
  return (
    <Wrapper>
      <Item>
        <Heading>Selected date:</Heading>
        {moment(selectedShift.date).format('dddd, MMMM D, YYYY')}
      </Item>
      <Item>
        <Heading>Selected shift:</Heading>
        {selectedShift.shift.name} ({selectedShift.shift.time})
      </Item>
      {
        selectedShift.person.name &&
        <Item>
          <Heading>Scheduled counsellor:</Heading>
          {selectedShift.person.name}
          &nbsp;
          {
            selectedShift.person.duration &&
            `(${selectedShift.person.duration} hours)`
          }
        </Item>
      }
    </Wrapper>
  )
})

export default ShiftDetails
