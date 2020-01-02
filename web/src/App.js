import React, { memo } from 'react'
import styled from 'styled-components'
import Calendar from './calendar'
import { PopUpProvider } from './popUp/PopUpContext'
import PopUp from './popUp'

const Wrapper = styled.div`
  @media(min-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const App = memo(() => (
  <Wrapper>
    <PopUpProvider>
      <Calendar />
      <PopUp />
    </PopUpProvider>
  </Wrapper>
))

export default App
