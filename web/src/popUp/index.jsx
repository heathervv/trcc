import React, { memo, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import config from '../config'
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

// TODO: FOR COUNSELLOR SELECTION
  // - Button to confirm schedule
    // - ON-CLICK have confirmation window to verify details
    // - On confirmation, update calendar UI to show newly filled slot (may have to rework dummy data logic for this)

const PopUp = memo(() => {
  const popUpContext = useContext(PopUpContext)
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
  }, [popUpContext])

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
                    selectedTime={selectedTime}
                    changeTime={changeTime}
                    unavailableTimeBlocks={unavailableTimeBlocks}
                  />
                </Details>
                <ConfirmShift changeVisibility={changeVisibility} />
              </Window>
            </Wrapper>
          }
        </>
      )}
    </PopUpConsumer>
  )
})

export default PopUp
