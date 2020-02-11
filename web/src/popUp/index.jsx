import React, { memo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { PopUpConsumer, FLOWS } from './PopUpContext'
import BookingCounsellor from './BookingCounsellor'
import Cancelling from './Cancelling'

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
  width: 85%;
  background: #fff;
  padding: 25px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,.5);
  box-shadow: 2px 2px 5px rgba(0,0,0,.3);

  @media (min-width: 900px) {
    width: 50%;
    max-width: 800px;
  }
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

const PopUp = memo(() => (
  <PopUpConsumer>
    {({ changeVisibility, isVisible, counsellor, ebu }) => (
      <>
        {
          isVisible &&
          <Wrapper>
            <Window>
              <Close onClick={changeVisibility}><FontAwesomeIcon icon={faTimes}/></Close>
              {
                counsellor.selected &&
                <>
                  {
                    counsellor.flow === FLOWS.ADD ? (
                      <BookingCounsellor/>
                    ) : (
                      <Cancelling person={Cancelling.PERSON.COUNSELLOR}/>
                    )
                  }
                </>
              }
              {
                ebu.selected &&
                <>
                  {
                    ebu.flow === FLOWS.ADD ? (
                      <p>hi im an ebu</p>
                    ) : (
                      <Cancelling person={Cancelling.PERSON.EBU}/>
                    )
                  }
                </>
              }
            </Window>
          </Wrapper>
        }
      </>
    )}
  </PopUpConsumer>
))

export default PopUp
