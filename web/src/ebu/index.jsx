import React from 'react'
import styled from 'styled-components'

const Copy = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: red;
`

const Ebu = ({ people }) => (
  <Copy>
    { people.map(person => person.name).join('/') }
  </Copy>
)

export default Ebu
