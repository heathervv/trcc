import React, { memo, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import config from '../../config'
import { ApiContext } from '../../api/ApiContext'
import { SchedulePopUpContext, SchedulePopUpConsumer } from '../SchedulePopUpContext'
import { Title } from '../CommonComponents'
import ShiftDetails from '../ShiftDetails'
import PopulateShift from './PopulateShift'
import ScheduleShift from './ScheduleShift'
import ConfirmShift from './ConfirmShift'

const PopUpDetails = styled.div`
  margin: 15px 0;

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const ErrorMessage = styled.p`
  display: block;
  width: 100%;
  font-weight: 600;
  background: rgba(255, 0, 0, .8);
  padding: 7px;
  border-radius: 3px;
  margin-bottom: 10px;
`

const BookingFlow = memo(() => {
    const apiContext = useContext(ApiContext)
    const schedulePopUpContext = useContext(SchedulePopUpContext)

    const [errorMessage, setErrorMessage] = useState('')
    const [selectedCounsellor, changeCounsellor] = useState()
    const [selectedTime, changeTime] = useState()
    const [unavailableTimeBlocks, setUnavailableTimeBlocks] = useState([])
    const [confirmBookShift, changeConfirmBookShift] = useState(false)

    useEffect(() => {
        const counsellor = schedulePopUpContext.selectedShift.counsellor
        const unavailableTimeBlocks = []

        if (counsellor) {
            unavailableTimeBlocks.push(config.SHIFT_STRINGS.FULL.key)

            if (counsellor.half === config.SHIFT_HALFS.FIRST) {
                unavailableTimeBlocks.push(config.SHIFT_STRINGS.FIRST_HALF.key)
            } else if (counsellor.half === config.SHIFT_HALFS.SECOND) {
                unavailableTimeBlocks.push(config.SHIFT_STRINGS.SECOND_HALF.key)
            }
        }

        setUnavailableTimeBlocks(unavailableTimeBlocks)
    }, [schedulePopUpContext])

    useEffect(() => {
        changeConfirmBookShift(false)
    }, [selectedCounsellor, selectedTime])

    const validateRequestedShiftDetails = () => {
        if (!selectedCounsellor) {
            setErrorMessage('A counsellor is required when booking a shift.')
        } else if (!selectedTime) {
            setErrorMessage('A time is required when booking a shift.')
        } else {
            setErrorMessage('')
            changeConfirmBookShift(true)
        }
    }

    useEffect(() => {
        return () => {
            setErrorMessage('')
            changeConfirmBookShift(false)
        }
    }, [schedulePopUpContext])

    const bookShift = () => {
        const scheduledShift = {
            shift: schedulePopUpContext.selectedShift.shift,
            duration: selectedTime === config.SHIFT_STRINGS.FULL.key ? 8 : 4,
            half: selectedTime !== config.SHIFT_STRINGS.FULL.key ? selectedTime : null
        }

        apiContext.scheduleNewShift(schedulePopUpContext.selectedShift.date, scheduledShift, selectedCounsellor)
        schedulePopUpContext.changeVisibility()
    }

    return (
        <SchedulePopUpConsumer>
            {({ changeVisibility, selectedShift }) => (
                <>
                    <Title>Fill a shift</Title>
                    <PopUpDetails>
                        <ShiftDetails selectedShift={selectedShift} />
                        <PopulateShift
                            selectedCounsellor={selectedCounsellor}
                            changeCounsellor={changeCounsellor}
                            selectedTime={selectedTime}
                            changeTime={changeTime}
                            unavailableTimeBlocks={unavailableTimeBlocks}
                        />
                    </PopUpDetails>

                    {
                        errorMessage &&
                        <ErrorMessage>{errorMessage}</ErrorMessage>
                    }

                    <ScheduleShift
                        changeVisibility={changeVisibility}
                        validateRequestedShiftDetails={validateRequestedShiftDetails}
                        disableButtons={confirmBookShift}
                    />

                    {
                        confirmBookShift &&
                        <ConfirmShift
                            changeVisibility={changeVisibility}
                            bookShift={bookShift}
                            scheduledShift={selectedShift}
                            selectedTime={selectedTime}
                            selectedCounsellor={selectedCounsellor}
                        />
                    }
                </>
            )}
        </SchedulePopUpConsumer>
    )
})

export default BookingFlow
