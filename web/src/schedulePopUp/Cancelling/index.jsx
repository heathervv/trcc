import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import { CounsellorApiContext } from '../../counsellorApi/CounsellorApiContext'
import { SchedulePopUpConsumer, SchedulePopUpContext } from '../SchedulePopUpContext'
import { MainButton } from '../../components/Button'
import Title from '../Title'
import ShiftDetails from '../ShiftDetails'

const DetailsWrapper = styled.div`
 margin: 15px 0;
`

const SchedulePopUp = memo(() => {
  const apiContext = useContext(CounsellorApiContext)
  const schedulePopUpContext = useContext(SchedulePopUpContext)

  const cancelShift = () => {
    apiContext.removeCounsellorFromShift(
      schedulePopUpContext.selectedShift.date,
      schedulePopUpContext.selectedShift.shift,
      schedulePopUpContext.selectedShift.counsellor
    )
    schedulePopUpContext.changeVisibility()
  }

  return (
    <SchedulePopUpConsumer>
      {({selectedShift}) => (
        <>
          <Title>Remove counsellor from shift</Title>
          <DetailsWrapper>
            <ShiftDetails selectedShift={selectedShift}/>
          </DetailsWrapper>
          <MainButton onClick={cancelShift}>Remove counsellor</MainButton>
        </>
      )}
    </SchedulePopUpConsumer>
  )
})

export default SchedulePopUp
