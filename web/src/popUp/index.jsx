import React, { memo, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
import { ApiContext } from '../api/ApiContext'
import { PopUpContext, PopUpConsumer } from './PopUpContext'
import ShiftDetails from './ShiftDetails'
import PopulateShift from './PopulateShift'
import ConfirmShift from './ConfirmShift'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,.5);
`

const Window = styled.div`
  position: relative;
  width: 50%;
  max-width: 800px;
  background: #fff;
  padding: 25px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,.5);
  box-shadow: 2px 2px 5px rgba(0,0,0,.3);
`

const Close = styled.button`
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  position: absolute;
  top: 10px;
  right: 10px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`

const Details = styled.div`
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

const PopUp = memo(() => {
  const apiContext = useContext(ApiContext)
  const popUpContext = useContext(PopUpContext)

  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCounsellor, changeCounsellor] = useState()
  const [selectedTime, changeTime] = useState()
  const [unavailableTimeBlocks, setUnavailableTimeBlocks] = useState([])

  useEffect(() => {
    const counsellor = popUpContext.selectedShift.counsellor
    const unavailableTimeBlocks = []

    if (counsellor) {
      unavailableTimeBlocks.push("full_shift")

      if (counsellor.half === config.SHIFT_HALFS.FIRST) {
        unavailableTimeBlocks.push("half_shift_first")
      } else if (counsellor.half === config.SHIFT_HALFS.SECOND) {
        unavailableTimeBlocks.push("half_shift_second")
      }
    }

    setUnavailableTimeBlocks(unavailableTimeBlocks)

    return () => {
      setErrorMessage('')
    }
  }, [popUpContext])

  const validateRequestedShiftDetails = () => {
    if (!selectedCounsellor) {
      setErrorMessage("A counsellor is required when booking a shift.")
    } else if (!selectedTime) {
      setErrorMessage("A time is required when booking a shift.")
    } else {
      setErrorMessage('')
      bookShift()
    }
  }

  const bookShift = () => {
    console.log('this is it!', selectedCounsellor, selectedTime);
    // TODO: Confirm selection before sending
    //
    apiContext.scheduleNewShift('date', 'shift', selectedCounsellor)
  }

  return (
    <PopUpConsumer>
      {({ changeVisibility, isVisible, selectedShift }) => (
        <>
          {
            isVisible &&
            <Wrapper>
              <Window>
                <Close onClick={changeVisibility}><FontAwesomeIcon icon={faTimes} /></Close>
                <Title>Fill a shift</Title>
                <Details>
                  <ShiftDetails selectedShift={selectedShift} />
                  <PopulateShift
                    selectedCounsellor={selectedCounsellor}
                    changeCounsellor={changeCounsellor}
                    selectedTime={selectedTime}
                    changeTime={changeTime}
                    unavailableTimeBlocks={unavailableTimeBlocks}
                  />
                </Details>
                {
                  errorMessage &&
                  <ErrorMessage>{errorMessage}</ErrorMessage>
                }
                <ConfirmShift changeVisibility={changeVisibility} bookShift={validateRequestedShiftDetails} />
              </Window>
            </Wrapper>
          }
        </>
      )}
    </PopUpConsumer>
  )
})

export default PopUp
