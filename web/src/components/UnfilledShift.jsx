import styled from "styled-components";

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
  color: ${props => props.color ? props.color : '#000'}
  
  &:hover {
    text-decoration: underline;
  }
`