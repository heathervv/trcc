import React, { memo, Fragment } from 'react'
import styled from 'styled-components'

const SHIFTS = {
  OVERNIGHT: "12am - 8am",
  DAY: "8am - 4pm",
  EVENING: "4pm - 12am"
}

const SHIFT_HALFS = {
  FIRST: "first",
  SECOND: "second"
}

const ShiftWrapper = styled.div`
  text-align: center;
  margin: 12px 0;
`

const Name = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
`

const Unfilled = styled.span`
  display: inline-block;
  background: yellow;
`

const Time = styled.p`
  font-size: 12px;
`

const NoShiftsFilled = () => (
  <Fragment>
    {
      Object.keys(SHIFTS).map((shift) => (
        <ShiftWrapper key={shift}>
          <Name><Unfilled>name</Unfilled></Name>
          <Time>{SHIFTS[shift]}</Time>
        </ShiftWrapper>
      ))
    }
  </Fragment>
)

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
      } else if (counsellor.half === SHIFT_HALFS.FIRST) {
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

const Shifts = memo(({ filledShifts }) => {
  if (!filledShifts) {
    return <NoShiftsFilled />
  }

  const overnightShift = filledShifts.shifts.find((shift) => shift.shift === "OVERNIGHT")
  const dayShift = filledShifts.shifts.find((shift) => shift.shift === "DAY")
  const eveningShift = filledShifts.shifts.find((shift) => shift.shift === "EVENING")

  return (
    <>
      <Shift {...overnightShift} shiftTime={SHIFTS.OVERNIGHT} />
      <Shift {...dayShift} shiftTime={SHIFTS.DAY} />
      <Shift {...eveningShift} shiftTime={SHIFTS.EVENING} />
    </>
  )
})

export default Shifts
