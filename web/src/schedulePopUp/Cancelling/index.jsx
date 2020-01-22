import React, { memo, useContext } from 'react'
import { ApiContext } from '../../api/ApiContext'
import {SchedulePopUpConsumer, SchedulePopUpContext} from '../SchedulePopUpContext'
import { MainActionButton, Title } from '../CommonComponents'
import ShiftDetails from '../ShiftDetails'

const SchedulePopUp = memo(() => {
    const apiContext = useContext(ApiContext)
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
                    <MainActionButton onClick={cancelShift}>Remove counsellor</MainActionButton>
                </>
            )}
        </SchedulePopUpConsumer>
    )
})

export default SchedulePopUp
