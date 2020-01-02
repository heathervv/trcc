import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Day from './Day'
import TEMP_FAKE_DATA from '../dummy_data.json'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

class Month extends Component {
  render() {
    const firstDayOfMonth = parseInt(this.props.date.startOf("month").format("d"))
    const totalDaysInMonth = this.props.date.daysInMonth()

    const blankSpaces = [...Array(firstDayOfMonth).keys()]
    const daysInMonth = [...Array(totalDaysInMonth).keys()]

    return (
      <Wrapper>
        {
          blankSpaces.map((space) => (
            <Day key={`blank-${space}`} blank />
          ))
        }
        {
          daysInMonth.map((dayOfMonth) => {
            let userFriendlyDayOfMonth = (dayOfMonth + 1).toString()

            // add leading 0 to single digit dates
            if (userFriendlyDayOfMonth.length === 1) {
              userFriendlyDayOfMonth = `0${userFriendlyDayOfMonth}`
            }

            const filledShiftsForTheDay = TEMP_FAKE_DATA.find((dayWithShifts) => {
              const parsedDate = moment(dayWithShifts.date)

              const matchingMonth = parsedDate.format("M") === this.props.date.format("M")
              const matchingDay = parsedDate.format("DD") === userFriendlyDayOfMonth

              return matchingMonth && matchingDay
            })

            return (
              <Day
                key={`actual-${userFriendlyDayOfMonth}`}
                date={moment(`${this.props.date.format("YYYY-MM")}-${userFriendlyDayOfMonth}`)}
                filledShifts={filledShiftsForTheDay}
              />
            )
          })
        }
      </Wrapper>
    )
  }
}

export default Month
