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

    this.state = {
      date: moment(),
      firstDayOfMonth: moment().startOf("month").format("d"),
      daysInMonth: moment().daysInMonth()
    }
  }

  changeActiveMonth = (direction) => {
    const newDate = this.state.date.add(direction, 'M')

    this.setState({
      date: newDate,
      firstDayOfMonth: newDate.startOf("month").format("d"),
      daysInMonth: newDate.daysInMonth()
    })
  }

  render() {
    return (
      <Wrapper>
        <Header date={this.state.date} changeActiveMonth={this.changeActiveMonth} />
        <Month
          firstDayOfMonth={this.state.firstDayOfMonth}
          daysInMonth={this.state.daysInMonth}
        />
      </Wrapper>
    )
  }
}

export default Calendar
