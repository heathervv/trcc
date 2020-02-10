import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Unfilled } from '../components/UnfilledShift'

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

const Ebu = ({ people, isAuthenticated }) => {
  const cancelShift = (personId) => {
    // TODO() open cancel popup
    console.log('You clicked on an ebu with the id:', personId)
  }

  const bookShift = () => {
    // TODO() open schedule popup
    console.log('You want to book an ebu shift')
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
