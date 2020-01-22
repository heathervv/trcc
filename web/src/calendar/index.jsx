import React, { Component }  from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Header from './Header'
import Month from './Month'

const Wrapper = styled.div`
  min-width: 700px;

  @media(min-width: 900px) {
    width: 75%;
    max-width: 1000px;
    margin: 15px;
  }
`

class Calendar extends Component {
  constructor() {
    super()

    this.state = {
      date: moment()
    }
  }

  changeActiveMonth = (direction) => {
    const date = this.state.date.add(direction, 'M')

    this.setState({ date })
  }

  render() {
    const { date } = this.state
    const { isAuthenticated } = this.props

    return (
      <Wrapper>
        <Header date={date} changeActiveMonth={this.changeActiveMonth}/>
        <Month date={date} isAuthenticated={isAuthenticated}/>
      </Wrapper>
    )
  }
}

export default Calendar
