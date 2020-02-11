import React, { Fragment } from 'react'
import styled from 'styled-components'
import config from '../config'
import { ShiftWrapper, Name, Time } from './CommonComponents'
import { Unfilled } from '../components/UnfilledShift'

const FilledShift = styled.button`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  
  &:hover {
    text-decoration: underline;
  }
`

const Shift = ({ shiftTime, counsellors, addCounsellorToShift, removeCounsellorFromShift, isAuthenticated }) => {
  const unFilledShift = () => (
    <Unfilled onClick={() => addCounsellorToShift(shiftTime)}>name</Unfilled>
  )

  const filledShift = (counsellor) => {
    if (isAuthenticated) {
      return (
        <FilledShift
          onClick={() => removeCounsellorFromShift(counsellor.id, shiftTime, counsellor.duration)}
        >
          {counsellor.name}
        </FilledShift>
      )
    }

    return counsellor.name
  }

  const counsellorsOnShift = () => {
    if (!counsellors) return (unFilledShift())

    const totalHoursForShift = 8
    let slots = [unFilledShift(), unFilledShift()]

    for (let i = 0; i < counsellors.length; i++) {
      if (counsellors[i].duration === totalHoursForShift) {
        slots[0] = filledShift(counsellors[i])
        slots.pop()
      } else if (counsellors[i].half === config.SHIFT_HALFS.FIRST) {
        slots[0] = filledShift(counsellors[i])
      } else {
        slots[1] = filledShift(counsellors[i])
      }
    }

    return slots.map((slot, i) => (
      <Fragment key={`${slot}-${i}`}>
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
