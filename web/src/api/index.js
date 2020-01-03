import config from '../config'
import TEMP_DATA from './dummy_data.json'
import TEMP_COUNSELLORS from './dummy_counsellors.json'

const getScheduledShifts = () => {
  return TEMP_DATA
}

const generateCounsellorsOnShift = (shift, counsellor, counsellors = null) => {
  const half = shift.half === config.SHIFT_STRINGS.FIRST_HALF.key ? config.SHIFT_HALFS.FIRST : config.SHIFT_HALFS.SECOND

  if (counsellors) {
    const existingCounsellor = counsellors.find((scheduledCounsellor) => scheduledCounsellor.id === parseInt(counsellor))

    if (existingCounsellor) {
      existingCounsellor.duration = 8
      existingCounsellor.half = null
    } else {
      counsellors.push({
        id: parseInt(counsellor),
        duration: shift.duration,
        half
      })
    }
  }

  return ([
    {
      id: parseInt(counsellor),
      duration: shift.duration,
      half
    }
  ])
}

const scheduleNewShift = (alreadyScheduledShifts, date, shift, counsellor) => {
  let newlyScheduledShift = {
    date: date,
    shifts: [
      {
        shift: shift.shift,
        counsellors: generateCounsellorsOnShift(shift, counsellor)
      }
    ]
  }

  const dateAlreadyContainsAtLeastOneScheduledShift = alreadyScheduledShifts.find((dayWithShifts) => dayWithShifts.date === date)
  if (dateAlreadyContainsAtLeastOneScheduledShift) {
    // Replace with existing scheduled date
    newlyScheduledShift = { ...dateAlreadyContainsAtLeastOneScheduledShift }

    const shiftIsAlreadyPartiallyScheduled = newlyScheduledShift.shifts.find((shiftWithCounsellor) => shiftWithCounsellor.shift === shift.shift)

    if (shiftIsAlreadyPartiallyScheduled) {
      generateCounsellorsOnShift(shift, counsellor, shiftIsAlreadyPartiallyScheduled.counsellors)
    } else {
      newlyScheduledShift.shifts.push({
        shift: shift.shift,
        counsellors: generateCounsellorsOnShift(shift, counsellor)
      })
    }
  }

  return [ ...alreadyScheduledShifts, newlyScheduledShift ]
}

const getCounsellors = () => {
  return TEMP_COUNSELLORS
}

export default {
  getScheduledShifts,
  scheduleNewShift,
  getCounsellors
}
