import React, {Fragment, useContext} from 'react'
import styled from 'styled-components'
import { Unfilled } from '../components/UnfilledShift'
import { PopUpContext } from "../popUp/PopUpContext"
import config from "../config"
import { PeopleApiContext } from "../api/people/PeopleApiContext"

const Copy = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: red;
`

const CopyAsAButton = styled.button`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: red;
  line-height: 1;
  
  &:hover {
    text-decoration: underline;
  }
`

const Ebu = ({ people, date, isAuthenticated }) => {
  const apiContext = useContext(PeopleApiContext)
  const popUpContext = useContext(PopUpContext)

  // TODO() send correct shifts for EBUs (instead of hardcoding FULL)
  const cancelShift = (personId) => {
    const selectedEbu = apiContext.findEbu(personId)

    popUpContext.changeVisibility()
    popUpContext.populatePopUpWithEbu(date.format("YYYY-MM-DD"), config.EBU_SHIFTS.FULL, selectedEbu)
  }

  const bookShift = () => {
    popUpContext.changeVisibility()
    popUpContext.populatePopUpWithEbu(date.format("YYYY-MM-DD"), config.EBU_SHIFTS.FULL)
  }

  if (isAuthenticated) {
    return (
      <>
        {
          people ? (
            people.map((person, i) => (
              <Fragment key={person.id}>
                { i !== 0 && <Copy>/</Copy>}
                <CopyAsAButton onClick={() => cancelShift(person.id)}>{person.name}</CopyAsAButton>
              </Fragment>
            ))
          ) : (
            <Unfilled color="red" onClick={bookShift}>name</Unfilled>
          )
        }
      </>
    )
  }

  return (
    <>
      {
        people &&
        <Copy>{people.map(person => person.name).join('/')}</Copy>
      }
    </>
  )
}

export default Ebu
