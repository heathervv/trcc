import React, { Component } from 'react'
import ApiClient from './index'

export const ApiContext = React.createContext()

export class ApiProvider extends Component {
  constructor() {
    super()

    this.state = {
      shifts: ApiClient.getScheduledShifts(),
      counsellors: ApiClient.getCounsellors()
    }
  }

  scheduleNewShift = (date, shift, counsellor) => {
    const updatedSchedule = ApiClient.scheduleNewShift(this.state.shifts, date, shift, counsellor)

    this.setState({ shifts: updatedSchedule })
  }

  render() {
    return (
      <ApiContext.Provider
        value={{
          scheduledShifts: this.state.shifts,
          scheduleNewShift: this.scheduleNewShift,
          listOfAllCounsellors: this.state.counsellors
        }}
      >
        {this.props.children}
      </ApiContext.Provider>
    )
  }
}

export const ApiConsumer = ApiContext.Consumer
