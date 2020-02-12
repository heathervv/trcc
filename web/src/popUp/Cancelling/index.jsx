import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import { PeopleApiContext } from '../../api/people/PeopleApiContext'
import { PopUpConsumer, PopUpContext } from '../PopUpContext'
import {Button, MainButton} from '../../components/Button'
import { Title } from '../CommonComponents'
import ShiftDetails from '../ShiftDetails'

const DetailsWrapper = styled.div`
 margin: 15px 0;
`

const Cancelling = memo(({ person }) => {
  const apiContext = useContext(PeopleApiContext)
  const popUpContext = useContext(PopUpContext)

  const cancelCounsellorShift = () => {
    apiContext.removeCounsellorFromShift(
      popUpContext.counsellor.selectedShift.date,
      popUpContext.counsellor.selectedShift.shift.name,
      popUpContext.counsellor.selectedShift.person
    )
    popUpContext.changeVisibility()
  }

  const cancelEbuShift = () => {
    // TODO() send call to API to remove EBU
    console.log('you attempted to cancel a shift... but it was ineffective!')
    popUpContext.changeVisibility()
  }

  return (
    <PopUpConsumer>
      {({changeVisibility, counsellor, ebu}) => (
        <>
          <Title>
            {
              person === Cancelling.PERSON.COUNSELLOR ? (
                "Remove counsellor from shift"
              ) : (
                "Remove EBU from shift"
              )
            }
          </Title>
          <DetailsWrapper>
            <ShiftDetails
              selectedShift={person === Cancelling.PERSON.COUNSELLOR ? counsellor.selectedShift : ebu.selectedShift}
            />
          </DetailsWrapper>
          {
            person === Cancelling.PERSON.COUNSELLOR ? (
              <MainButton onClick={cancelCounsellorShift}>Remove counsellor</MainButton>
            ) : (
              <MainButton onClick={cancelEbuShift}>Remove EBU</MainButton>
            )
          }
          <Button onClick={changeVisibility}>Cancel</Button>
        </>
      )}
    </PopUpConsumer>
  )
})

Cancelling.PERSON = {
  COUNSELLOR: "counsellor",
  EBU: "ebu"
}

export default Cancelling
