import React, { PureComponent } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Header from './Header'
import Month from './Month'

const Wrapper = styled.div`
  width: 75%;
  max-width: 1000px;
  margin: 15px;
`

class Calendar extends PureComponent {
  constructor() {
    super()

    this.date = moment()
    this.firstDayOfMonth = moment(this.date).startOf("month").format("d")
    this.daysInMonth = this.date.daysInMonth()
  }

  render() {
    return (
      <Wrapper>
        <Header date={this.date} />
        <Month
          firstDayOfMonth={this.firstDayOfMonth}
          daysInMonth={this.daysInMonth}
        />
      </Wrapper>
    )
  }
}

export default Calendar
