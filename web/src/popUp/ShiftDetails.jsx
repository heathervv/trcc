import React, { memo } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import config from '../config'

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
  // Turn shift into Title case
  const formattedShift = `${selectedShift.shift.charAt(0)}${selectedShift.shift.substr(1).toLowerCase()}`

  return (
    <Wrapper>
      <Item>
        <Heading>Selected date:</Heading>
        {moment(selectedShift.date).format('dddd, MMMM D, YYYY')}
      </Item>
      <Item>
        <Heading>Selected shift:</Heading>
        {formattedShift} ({config.SHIFTS[selectedShift.shift]})
      </Item>
      {
        selectedShift.counsellor &&
        <Item>
          <Heading>Counsellor already scheduled:</Heading>
          {selectedShift.counsellor.name} (4 hours)
        </Item>
      }
    </Wrapper>
  )
})

export default ShiftDetails
