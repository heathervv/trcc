import React, { memo, useContext } from 'react'
import config from '../config'
import { CounsellorApiContext } from '../api/counsellors/CounsellorApiContext'
import { PopUpContext } from '../popUp/PopUpContext'
import NoShiftsFilled from './NoShiftsFilled'
import Shift from './Shift'

const Shifts = memo(({ filledShifts, date, isAuthenticated }) => {
  const apiContext = useContext(CounsellorApiContext)
  const popUpContext = useContext(PopUpContext)

  const addCounsellorToShift = (shiftTime) => {
    const SHIFT = Object.keys(config.SHIFTS).find((key) => config.SHIFTS[key] === shiftTime)
    const counsellorOnShift = apiContext.findPotentialCounsellorAlreadyOnShift(date.format("YYYY-MM-DD"), SHIFT)

    popUpContext.changeVisibility()
    popUpContext.populatePopUpWithCounsellor(date.format("YYYY-MM-DD"), SHIFT, counsellorOnShift)
  }

  const removeCounsellorFromShift = (counsellorId, shiftTime, counsellorDuration) => {
    const SHIFT = Object.keys(config.SHIFTS).find((key) => config.SHIFTS[key] === shiftTime)
    const counsellorOnShift = apiContext.findCounsellor(counsellorId)

    popUpContext.changeVisibility()
    popUpContext.populatePopUpWithCounsellor(date.format("YYYY-MM-DD"), SHIFT, counsellorOnShift, counsellorDuration)
  }

  if (!filledShifts) {
    return <NoShiftsFilled addCounsellorToShift={addCounsellorToShift}/>
  }

  const overnightShift = filledShifts.find((shift) => shift.shift === "OVERNIGHT")
  const dayShift = filledShifts.find((shift) => shift.shift === "DAY")
  const eveningShift = filledShifts.find((shift) => shift.shift === "EVENING")

  return (
    <>
      <Shift
        {...overnightShift}
        shiftTime={config.SHIFTS.OVERNIGHT}
        addCounsellorToShift={addCounsellorToShift}
        removeCounsellorFromShift={removeCounsellorFromShift}
        isAuthenticated={isAuthenticated}
      />

      <Shift
        {...dayShift}
        shiftTime={config.SHIFTS.DAY}
        addCounsellorToShift={addCounsellorToShift}
        removeCounsellorFromShift={removeCounsellorFromShift}
        isAuthenticated={isAuthenticated}
      />

      <Shift
        {...eveningShift}
        shiftTime={config.SHIFTS.EVENING}
        addCounsellorToShift={addCounsellorToShift}
        removeCounsellorFromShift={removeCounsellorFromShift}
        isAuthenticated={isAuthenticated}
      />
    </>
  )
})

export default Shifts
