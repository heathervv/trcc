import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import config from '../../config'
import { Button, MainActionButton } from '../CommonComponents'
import { ApiContext } from '../../api/ApiContext'

const Confirm = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid grey;
  text-align: left;
`

const Header = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
`

const Details = styled.p`
  line-height: 1.4;
  margin-bottom: 16px;
`

const List = styled.ul`
  margin-bottom: 8px;
`

const Item = styled.li`
  margin-bottom: 8px;
`

const Bold = styled.span`
  font-weight: 600;
`

const ButtonWrapper = styled.div`
  text-align: center;
`

const ScheduleShift = memo(({
  changeVisibility,
  bookShift,
  scheduledShift,
  selectedTime,
  selectedCounsellor
}) => {
  const apiContext = useContext(ApiContext)

  // Turn shift into Title case
  const formattedShift = `${scheduledShift.shift.charAt(0)}${scheduledShift.shift.substr(1).toLowerCase()}`

  const correctTimeString = Object.keys(config.SHIFT_STRINGS).find((key) => config.SHIFT_STRINGS[key].key === selectedTime)
  const formattedTime = config.SHIFT_STRINGS[correctTimeString].value
  const selectedCounsellorsName = apiContext.listOfAllCounsellors.find((counsellor) => counsellor.id === parseInt(selectedCounsellor)).name

  return (
    <Confirm>
      <Header>Confirm shift</Header>
      <Details>Before booking your shift, please confirm the details below are correct. If everything is correct, click "I confirm" to finish booking your shift.</Details>
      <List>
        <Item><Bold>Selected date:</Bold> {moment(scheduledShift.date).format('dddd, MMMM D, YYYY')}</Item>
        <Item><Bold>Selected shift:</Bold> {formattedShift} ({config.SHIFTS[scheduledShift.shift]})</Item>
        <Item><Bold>Selected time:</Bold> {formattedTime}</Item>
        <Item><Bold>Selected counsellor:</Bold> {selectedCounsellorsName}</Item>
      </List>
      <ButtonWrapper>
        <MainActionButton onClick={bookShift}>I confirm</MainActionButton>
        <Button onClick={changeVisibility}>Cancel</Button>
      </ButtonWrapper>
    </Confirm>
  )
})

export default ScheduleShift
