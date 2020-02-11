import React, { memo, useContext } from 'react'
import styled from 'styled-components'
import { CounsellorApiContext } from '../../api/counsellors/CounsellorApiContext'
import { PopUpConsumer, PopUpContext } from '../PopUpContext'
import { MainButton } from '../../components/Button'
import { Title } from '../CommonComponents'
import ShiftDetails from '../ShiftDetails'

const DetailsWrapper = styled.div`
 margin: 15px 0;
`

const Cancelling = memo(({ person }) => {
  const apiContext = useContext(CounsellorApiContext)
  const popUpContext = useContext(PopUpContext)

  const cancelCounsellorShift = () => {
    apiContext.removeCounsellorFromShift(
      popUpContext.counsellor.selectedShift.date,
      popUpContext.counsellor.selectedShift.shift,
      popUpContext.counsellor.selectedShift.person
    )
    popUpContext.changeVisibility()
  }

  const cancelEbuShift = () => {
    console.log('TODO() send call to API to remove EBU')
    popUpContext.changeVisibility()
  }

  return (
    <PopUpConsumer>
      {({counsellor}) => (
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
            {
              person === Cancelling.PERSON.COUNSELLOR ? (
                <ShiftDetails selectedShift={counsellor.selectedShift}/>
              ) : (
                <p>hi im an ebu</p>
              )
            }
          </DetailsWrapper>
          {
            person === Cancelling.PERSON.COUNSELLOR ? (
              <MainButton onClick={cancelCounsellorShift}>Remove counsellor</MainButton>
            ) : (
              <MainButton onClick={cancelEbuShift}>Remove EBU</MainButton>
            )
          }
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
