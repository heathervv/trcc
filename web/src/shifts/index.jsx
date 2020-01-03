import React, { memo, useContext } from 'react'
import config from '../config'
import { ApiContext } from '../api/ApiContext'
import { PopUpContext } from '../popUp/PopUpContext'
import NoShiftsFilled from './NoShiftsFilled'
import Shift from './Shift'

const Shifts = memo(({ filledShifts, date }) => {
  const apiContext = useContext(ApiContext)
  const popUpContext = useContext(PopUpContext)

  const addCounsellorToShift = (shiftTime) => {
    const SHIFT = Object.keys(config.SHIFTS).find((key) => config.SHIFTS[key] === shiftTime)
    const counsellorAlreadyOnShift = apiContext.findPotentialCounsellorAlreadyOnShift(date.format("YYYY-MM-DD"), SHIFT)

    popUpContext.changeVisibility()
    popUpContext.changeSelectedShift(date.format("YYYY-MM-DD"), SHIFT, counsellorAlreadyOnShift)
  }

  if (!filledShifts) {
    return <NoShiftsFilled addCounsellorToShift={addCounsellorToShift} />
  }

  const overnightShift = filledShifts.shifts.find((shift) => shift.shift === "OVERNIGHT")
  const dayShift = filledShifts.shifts.find((shift) => shift.shift === "DAY")
  const eveningShift = filledShifts.shifts.find((shift) => shift.shift === "EVENING")

  return (
    <>
      <Shift {...overnightShift} shiftTime={config.SHIFTS.OVERNIGHT} addCounsellorToShift={addCounsellorToShift} />
      <Shift {...dayShift} shiftTime={config.SHIFTS.DAY} addCounsellorToShift={addCounsellorToShift} />
      <Shift {...eveningShift} shiftTime={config.SHIFTS.EVENING} addCounsellorToShift={addCounsellorToShift} />
    </>
  )
})

export default Shifts
