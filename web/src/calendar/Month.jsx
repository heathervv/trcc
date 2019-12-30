import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Day from './Day'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

class Month extends PureComponent {
  renderBlankSpacesPriorToFirstDay = () => {
    let blankDays = []

    for (let i = 0; i < this.props.firstDayOfMonth; i++) {
      blankDays.push(
        <Day key={`blank-${i}`} blank />
      )
    }

    return blankDays
  }

  renderSpacesForAllDaysInMonth = () => {
    let daysInMonth = []

    for (let i = 1; i <= this.props.daysInMonth; i++) {
      daysInMonth.push(
        <Day key={`actual-${i}`} date={i} />
      )
    }

    return daysInMonth
  }

  render() {
    return (
      <Wrapper>
        {this.renderBlankSpacesPriorToFirstDay()}
        {this.renderSpacesForAllDaysInMonth()}
      </Wrapper>
    )
  }
}

export default Month
