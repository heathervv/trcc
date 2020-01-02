import React, { Fragment } from 'react'
import config from '../config'
import { ApiConsumer } from '../api/ApiContext'
import { ShiftWrapper, Name, Time, Unfilled } from './CommonComponents'

const Shift = ({ shiftTime, counsellors, addCounsellorToShift }) => {
  const unFilledShift = () => (
    <Unfilled onClick={() => addCounsellorToShift(shiftTime)}>name</Unfilled>
  )

  const counsellorsOnShift = (listOfAllCounsellors) => {
    if (!counsellors) return (unFilledShift())

    const totalHoursForShift = 8
    let slots = [unFilledShift(), unFilledShift()]

    for (let i = 0; i < counsellors.length; i++) {
      const counsellor = counsellors[i]
      const timeOnShift = counsellor.duration

      if (timeOnShift === totalHoursForShift) {
        slots[0] = listOfAllCounsellors.find((x) => x.id === counsellor.id).name
        slots.pop()
      } else if (counsellor.half === config.SHIFT_HALFS.FIRST) {
        slots[0] = listOfAllCounsellors.find((x) => x.id === counsellor.id).name
      } else {
        slots[1] = listOfAllCounsellors.find((x) => x.id === counsellor.id).name
      }
    }

    return slots.map((slot, i) => (
      <Fragment key={slot}>
        {i > 0 && "/"}
        {slot}
      </Fragment>
    ))
  }

  return (
    <ApiConsumer>
      {({ listOfAllCounsellors }) => (
        <ShiftWrapper key={shiftTime}>
          <Name>{counsellorsOnShift(listOfAllCounsellors)}</Name>
          <Time>{shiftTime}</Time>
        </ShiftWrapper>
      )}
    </ApiConsumer>
  )
}

export default Shift
