const SHIFTS = {
  OVERNIGHT: "12am - 8am",
  DAY: "8am - 4pm",
  EVENING: "4pm - 12am"
}

const SHIFT_HALFS = {
  FIRST: "first",
  SECOND: "second"
}

const SHIFT_STRINGS = {
  FULL: {
    key: "full_shift",
    value: "Full shift (8 hours)"
  },
  FIRST_HALF: {
    key: "half_shift_first",
    value: "First half (4 hours)"
  },
  SECOND_HALF: {
    key: "half_shift_second",
    value: "Second half (4 hours)"
  }
}

const EBU_SHIFTS = {
  FULL: "full",
  FIRST_HALF: "first half",
  SECOND_HALF: "second half"
}

export default {
  SHIFTS,
  SHIFT_HALFS,
  SHIFT_STRINGS,
  EBU_SHIFTS
}
