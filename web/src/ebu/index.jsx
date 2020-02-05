import React, { Fragment } from 'react'
import styled from 'styled-components'

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
  const updateScheduledEbu = (personId) => {
    // TODO(): Cancel pop-up should show up now
    console.log('You clicked on an ebu with the id:', personId)
  }

  if (isAuthenticated) {
    return (
      <>
        {
          people.map((person, i) => (
            <Fragment key={person.id}>
              { i !== 0 && <Copy>/</Copy>}
              <CopyAsAButton onClick={() => updateScheduledEbu(person.id)}>{person.name}</CopyAsAButton>
            </Fragment>
          ))
        }
      </>
    )
  }

  return (
    <Copy>{ people.map(person => person.name).join('/') }</Copy>
  )
}

export default Ebu
