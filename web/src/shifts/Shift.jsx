import React, { Fragment } from 'react'
import config from '../config'
import { ShiftWrapper, Name, Time, Unfilled } from './CommonComponents'
import TEMP_COUNSELLORS from '../dummy_counsellors.json'

const Shift = ({ shiftTime, counsellors, addCounsellorToShift }) => {
  const unFilledShift = () => (
    <Unfilled onClick={() => addCounsellorToShift(shiftTime)}>name</Unfilled>
  )

  const counsellorsOnShift = () => {
    if (!counsellors) return (unFilledShift())

    const totalHoursForShift = 8
    let slots = [unFilledShift(), unFilledShift()]

    for (let i = 0; i < counsellors.length; i++) {
      const counsellor = counsellors[i]
      const timeOnShift = counsellor.duration

      if (timeOnShift === totalHoursForShift) {
        slots[0] = TEMP_COUNSELLORS.find((x) => x.id === counsellor.id).name
        slots.pop()
      } else if (counsellor.half === config.SHIFT_HALFS.FIRST) {
        slots[0] = TEMP_COUNSELLORS.find((x) => x.id === counsellor.id).name
      } else {
        slots[1] = TEMP_COUNSELLORS.find((x) => x.id === counsellor.id).name
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
    <ShiftWrapper key={shiftTime}>
      <Name>{counsellorsOnShift()}</Name>
      <Time>{shiftTime}</Time>
    </ShiftWrapper>
  )
}

export default Shift
