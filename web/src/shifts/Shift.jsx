import React, { Fragment, useContext } from 'react'
import styled from 'styled-components'
import config from '../config'
import { CounsellorApiContext } from '../counsellorApi/CounsellorApiContext'
import { ShiftWrapper, Name, Time, Unfilled } from './CommonComponents'

const FilledShift = styled.button`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`

const Shift = ({ shiftTime, counsellors, addCounsellorToShift, removeCounsellorFromShift, isAuthenticated }) => {
  const apiContext = useContext(CounsellorApiContext)

  const unFilledShift = () => (
    <Unfilled onClick={() => addCounsellorToShift(shiftTime)}>name</Unfilled>
  )

  const filledShift = (counsellorId, counsellorDuration) => {
    const counsellorName = apiContext.listOfAllCounsellors.find((x) => x.id === counsellorId).name

    if (isAuthenticated) {
      return (
        <FilledShift
          onClick={() => removeCounsellorFromShift(counsellorId, shiftTime, counsellorDuration)}
        >
          {counsellorName}
        </FilledShift>
      )
    }

    return counsellorName
  }

  const counsellorsOnShift = () => {
    if (!counsellors) return (unFilledShift())

    const totalHoursForShift = 8
    let slots = [unFilledShift(), unFilledShift()]

    for (let i = 0; i < counsellors.length; i++) {
      const counsellor = counsellors[i]
      const timeOnShift = counsellor.duration

      if (timeOnShift === totalHoursForShift) {
        slots[0] = filledShift(counsellor.id, counsellor.duration)
        slots.pop()
      } else if (counsellor.half === config.SHIFT_HALFS.FIRST) {
        slots[0] = filledShift(counsellor.id, counsellor.duration)
      } else {
        slots[1] = filledShift(counsellor.id, counsellor.duration)
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
