import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Day from './Day'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

class Month extends PureComponent {
  renderBlankSpacesPriorToFirstDay = () => {
    const { firstDayOfMonth } = this.props
    let blankDays = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      blankDays.push(
        <Day key={`blank-${i}`} blank />
      )
    }

    return blankDays
  }

  renderSpacesForAllDaysInMonth = () => {
    const { daysInMonth, currentDay } = this.props
    let totalDays = []

    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay = i.toString() === currentDay

      totalDays.push(
        <Day key={`actual-${i}`} date={i} current={isCurrentDay} />
      )
    }

    return totalDays
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
