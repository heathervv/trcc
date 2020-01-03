import styled from 'styled-components'

export const Button = styled.button`
  appearance: none;
  border-radius: 5px;
  border: none;
  margin: 5px;
  font-weight: 500;
  text-decoration: underline;
  min-width: 200px;

  &:hover {
    text-decoration: ${props => props.disabled ? '' : 'none'};
  }
`

export const BookShiftButton = styled(Button)`
  background: ${props => props.disabled ? '#ccc' : '#40C622'};
  padding: 12px 20px;
  text-decoration: none;

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#41B428'};
  }
`
