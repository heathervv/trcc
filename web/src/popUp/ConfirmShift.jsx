import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;

  @media (min-width: 900px) {
    text-align: left;
  }
`

const Button = styled.button`
  appearance: none;
  border-radius: 5px;
  border: none;
  margin: 5px;
  font-weight: 500;
  text-decoration: underline;
  min-width: 200px;

  &:hover {
    text-decoration: none;
  }
`

const ConfirmButton = styled(Button)`
  background: #40C622;
  padding: 12px 20px;
  text-decoration: none;

  &:hover {
    background: #41B428
  }
`

const ConfirmShift = ({ changeVisibility }) => (
  <Wrapper>
    <ConfirmButton>Book shift</ConfirmButton>
    <Button onClick={changeVisibility}>Cancel</Button>
  </Wrapper>
)

export default ConfirmShift
