import React, { memo, useContext } from 'react'
import { CounsellorApiContext } from '../../counsellorApi/CounsellorApiContext'
import {SchedulePopUpConsumer, SchedulePopUpContext} from '../SchedulePopUpContext'
import { MainButton } from '../../components/Button'
import Title from '../Title'
import ShiftDetails from '../ShiftDetails'

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
            {({ selectedShift }) => (
                <>
                    <Title>Remove counsellor from shift</Title>
                    <ShiftDetails selectedShift={selectedShift} />
                    <MainButton onClick={cancelShift}>Remove counsellor</MainButton>
                </>
            )}
        </SchedulePopUpConsumer>
    )
})

export default SchedulePopUp
