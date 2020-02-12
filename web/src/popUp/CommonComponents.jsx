import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`

export const PopUpDetails = styled.div`
  margin: 15px 0;

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`
