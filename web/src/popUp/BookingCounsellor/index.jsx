import React, { memo, useState, useEffect, useContext } from 'react'
import config from '../../config'
import { PeopleApiContext, PeopleApiConsumer } from '../../api/people/PeopleApiContext'
import { PopUpContext, PopUpConsumer } from '../PopUpContext'
import Error from '../../components/Error'
import { Title, PopUpDetails } from '../CommonComponents'
import ShiftDetails from '../ShiftDetails'
import PopulateShift from './PopulateShift'
import ScheduleShift from '../ScheduleShift'
import ConfirmShift from '../ConfirmShift'

const BookingCounsellor = memo(() => {
  const apiContext = useContext(PeopleApiContext)
  const popUpContext = useContext(PopUpContext)

  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCounsellor, changeCounsellor] = useState()
  const [selectedTime, changeTime] = useState()
  const [unavailableTimeBlocks, setUnavailableTimeBlocks] = useState([])
  const [confirmBookShift, changeConfirmBookShift] = useState(false)

  useEffect(() => {
    const counsellor = popUpContext.counsellor.selectedShift.person
    const unavailableTimeBlocks = []

    if (Object.keys(counsellor).length > 0) {
      unavailableTimeBlocks.push(config.SHIFT_STRINGS.FULL.key)

      if (counsellor.half === config.SHIFT_HALFS.FIRST) {
        unavailableTimeBlocks.push(config.SHIFT_STRINGS.FIRST_HALF.key)
      } else if (counsellor.half === config.SHIFT_HALFS.SECOND) {
        unavailableTimeBlocks.push(config.SHIFT_STRINGS.SECOND_HALF.key)
      }
    }

    setUnavailableTimeBlocks(unavailableTimeBlocks)
  }, [popUpContext])

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
  }, [popUpContext])

  const bookShift = () => {
    const scheduledShift = {
      shift: popUpContext.counsellor.selectedShift.shift.name,
      duration: selectedTime === config.SHIFT_STRINGS.FULL.key ? 8 : 4,
      half: selectedTime !== config.SHIFT_STRINGS.FULL.key ? selectedTime : null
    }

    apiContext.scheduleNewShift(popUpContext.counsellor.selectedShift.date, scheduledShift, selectedCounsellor)
    popUpContext.changeVisibility()
  }

  return (
    <PopUpConsumer>
      {({changeVisibility, counsellor}) => (
        <PeopleApiConsumer>
          {({listOfAllCounsellors}) => (
            <>
              <Title>Fill a shift</Title>
              <PopUpDetails>
                <ShiftDetails selectedShift={counsellor.selectedShift}/>
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
                <Error>{errorMessage}</Error>
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
                  scheduledShift={counsellor.selectedShift}
                  selectedTime={selectedTime}
                  selectedCounsellor={listOfAllCounsellors.find(c => c.id === Number(selectedCounsellor))}
                />
              }
            </>
          )}
        </PeopleApiConsumer>
      )}
    </PopUpConsumer>
  )
})

export default BookingCounsellor
