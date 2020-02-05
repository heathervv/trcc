import styled from 'styled-components'

export const ShiftWrapper = styled.div`
  text-align: center;
  margin: 12px 0;
`

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
`

export const Unfilled = styled.button`
  display: inline-block;
  background: yellow;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  appearance: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`

export const Time = styled.p`
  font-size: 12px;
`
