import React, { memo } from 'react'
import config from '../config'
import NoShiftsFilled from './NoShiftsFilled'
import Shift from './Shift'

const Shifts = memo(({ filledShifts }) => {
  if (!filledShifts) {
    return <NoShiftsFilled />
  }

  const overnightShift = filledShifts.shifts.find((shift) => shift.shift === "OVERNIGHT")
  const dayShift = filledShifts.shifts.find((shift) => shift.shift === "DAY")
  const eveningShift = filledShifts.shifts.find((shift) => shift.shift === "EVENING")

  return (
    <>
      <Shift {...overnightShift} shiftTime={config.SHIFTS.OVERNIGHT} />
      <Shift {...dayShift} shiftTime={config.SHIFTS.DAY} />
      <Shift {...eveningShift} shiftTime={config.SHIFTS.EVENING} />
    </>
  )
})

export default Shifts
