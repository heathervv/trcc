import React, { memo } from 'react'
import styled from 'styled-components'
import Calendar from './calendar'

const Wrapper = styled.div`
  @media(min-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const App = memo(() => (
  <Wrapper>
    <Calendar />
  </Wrapper>
))

export default App
