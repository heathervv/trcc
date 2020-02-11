import React, { memo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  background: #fff;
  padding: 25px 45px;
  border-radius: 3px;
  border: 1px solid #000;
  margin: 15px 15px 30px;
`

const Icon = styled.span`
  display: inline-block;
  margin-right: 5px;
`

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`

const CancelShift = memo(() => (
  <Wrapper>
    <Title>
      <Icon><FontAwesomeIcon icon={faExclamationCircle} color="red"/></Icon> Need help?
    </Title>
    <p>
      If you need help cancelling or rescheduling a shift, please email <a href="mailto:fakeemail@gmail.com">fakeemail@gmail.com</a> with the details.
    </p>
  </Wrapper>
))

export default CancelShift
