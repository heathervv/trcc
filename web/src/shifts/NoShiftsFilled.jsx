import React from 'react'
import config from '../config'
import { ShiftWrapper, Name, Time } from './CommonComponents'
import { Unfilled } from '../components/UnfilledShift'

const NoShiftsFilled = ({ addCounsellorToShift }) => (
  <>
    {
      Object.keys(config.SHIFTS).map((shift) => (
        <ShiftWrapper key={shift}>
          <Name>
            <Unfilled onClick={() => addCounsellorToShift(config.SHIFTS[shift])}>name</Unfilled>
          </Name>
          <Time>{config.SHIFTS[shift]}</Time>
        </ShiftWrapper>
      ))
    }
  </>
)

export default NoShiftsFilled
