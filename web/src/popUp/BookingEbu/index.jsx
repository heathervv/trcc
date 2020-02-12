import React, { memo, useContext, useEffect, useState } from 'react'
import { PopUpConsumer, PopUpContext } from "../PopUpContext"
import Error from "../../components/Error"
import { Title, PopUpDetails } from '../CommonComponents'
import PopulateEbuShift from "./PopulateEbuShift"
import ScheduleShift from "../ScheduleShift"
import ShiftDetails from "../ShiftDetails"
import config from "../../config";

const BookingEbu = memo(() => {
  const popUpContext = useContext(PopUpContext)

  const [errorMessage, setErrorMessage] = useState('')
  const [selectedEbu, changeEbu] = useState()
  const [selectedTime, changeTime] = useState()
  const [confirmBookShift, changeConfirmBookShift] = useState(false)
  const [unavailableTimeBlocks, setUnavailableTimeBlocks] = useState([])

  useEffect(() => {
    const ebu = popUpContext.ebu.selectedShift.person
    const unavailableTimeBlocks = []

    if (Object.keys(ebu).length > 0) {
      unavailableTimeBlocks.push(config.EBU_SHIFTS.FULL.key)

      if (ebu.half === config.SHIFT_HALFS.FIRST) {
        unavailableTimeBlocks.push(config.EBU_SHIFTS.FIRST_HALF.key)
      } else if (ebu.half === config.SHIFT_HALFS.SECOND) {
        unavailableTimeBlocks.push(config.EBU_SHIFTS.SECOND_HALF.key)
      }
    }

    setUnavailableTimeBlocks(unavailableTimeBlocks)
  }, [popUpContext])

  useEffect(() => {
    changeConfirmBookShift(false)
  }, [selectedEbu, selectedTime])

  const validateRequestedShiftDetails = () => {
    if (!selectedEbu) {
      setErrorMessage('An EBU is required.')
    } else if (!selectedTime) {
      setErrorMessage('A time is required.')
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
    // TODO() send call to API to book the EBU

    console.log('We can pretend we booked the EBU, right? Right??')
    popUpContext.changeVisibility()
  }

  return (
    <PopUpConsumer>
      {({changeVisibility, ebu}) => (
        <>
          <Title>Schedule EBU</Title>
          <PopUpDetails>
            <ShiftDetails selectedShift={ebu.selectedShift}/>
            <PopulateEbuShift
              selectedEbu={selectedEbu}
              changeEbu={changeEbu}
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
            <p>Confirm friend</p>
          }
        </>
      )}
    </PopUpConsumer>
  )
})

export default BookingEbu