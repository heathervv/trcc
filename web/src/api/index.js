import TEMP_DATA from './dummy_data.json'
import TEMP_COUNSELLORS from './dummy_counsellors.json'

const getScheduledShifts = () => {
  return TEMP_DATA
}

const scheduleNewShift = (date, shift, counsellor) => {
  // TODO: To return new list of all scheduled shifts
  console.log('STUBBED OUT (Api client request new shift to be scheduled)');
}

const getCounsellors = () => {
  return TEMP_COUNSELLORS
}

export default {
  getScheduledShifts,
  scheduleNewShift,
  getCounsellors
}
