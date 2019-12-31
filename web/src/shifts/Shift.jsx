import React, { Fragment } from 'react'
import config from '../config'
import { ShiftWrapper, Name, Time, Unfilled } from './CommonComponents'

const Shift = ({ shiftTime, counsellors }) => {
  const counsellorsOnShift = () => {
    if (!counsellors) return (<Unfilled>name</Unfilled>)

    const totalHoursForShift = 8
    let slots = [<Unfilled>name</Unfilled>, <Unfilled>name</Unfilled>]

    for (let i = 0; i < counsellors.length; i++) {
      const counsellor = counsellors[i]
      const timeOnShift = counsellor.duration

      if (timeOnShift === totalHoursForShift) {
        slots[0] = counsellor.name
        slots.pop()
      } else if (counsellor.half === config.SHIFT_HALFS.FIRST) {
        slots[0] = counsellor.name
      } else {
        slots[1] = counsellor.name
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

// TODO: FOR COUNSELLOR SELECTION
// - Generate dummy list of counsellors (like dummy data object)
// - Make unfilled slots clickable
// - Create pop-up that shows up when an unfilled slot is clicked
  // - Details of selected slot (Date, shift time, any counsellors currently scheduled for that shift)
  // - Dropdown populated with list of counsellors (name)
  // - Option to select full shift (default), first half, or second half
  // - Button to confirm schedule
    // - ON-CLICK have confirmation window to verify details
    // - On confirmation, update calendar UI to show newly filled slot (may have to rework dummy data logic for this)
  // - Button to cancel (closes pop-up)
  // - X close button (closes pop-up)
