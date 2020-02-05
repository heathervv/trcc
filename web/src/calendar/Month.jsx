import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { CounsellorApiConsumer } from '../counsellorApi/CounsellorApiContext'
import Day from './Day'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

class Month extends Component {
  render() {
    const {isAuthenticated} = this.props

    const firstDayOfMonth = parseInt(this.props.date.startOf("month").format("d"))
    const totalDaysInMonth = this.props.date.daysInMonth()

    const blankSpaces = [...Array(firstDayOfMonth).keys()]
    const daysInMonth = [...Array(totalDaysInMonth).keys()]

    return (
      <CounsellorApiConsumer>
        {({ scheduledShifts }) => (
          <Wrapper>
            {
              blankSpaces.map((space) => (
                <Day key={`blank-${space}`} blank/>
              ))
            }
            {
              daysInMonth.map((dayOfMonth) => {
                let userFriendlyDayOfMonth = (dayOfMonth + 1).toString()

                // add leading 0 to single digit dates
                if (userFriendlyDayOfMonth.length === 1) {
                  userFriendlyDayOfMonth = `0${userFriendlyDayOfMonth}`
                }

                // returns existing scheduled day OR undefined at this point
                const possibleScheduledPeople = scheduledShifts.find((dayWithShifts) => {
                  const parsedDate = moment(dayWithShifts.date)

                  const matchingMonth = parsedDate.format("M") === this.props.date.format("M")
                  const matchingDay = parsedDate.format("DD") === userFriendlyDayOfMonth

                  return matchingMonth && matchingDay
                })

                return (
                  <Day
                    key={`actual-${userFriendlyDayOfMonth}`}
                    date={moment(`${this.props.date.format("YYYY-MM")}-${userFriendlyDayOfMonth}`)}
                    possibleScheduledPeople={possibleScheduledPeople}
                    isAuthenticated={isAuthenticated}
                  />
                )
              })
            }
          </Wrapper>
        )}
      </CounsellorApiConsumer>
    )
  }
}

export default Month
