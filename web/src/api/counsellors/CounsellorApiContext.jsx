import React, { Component } from 'react'
import ApiClient from './counsellorApi'

export const CounsellorApiContext = React.createContext()

export class CounsellorApiProvider extends Component {
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

  findPotentialCounsellorAlreadyOnShift = (date, shift) => {
    let counsellor = null

    const selectedDateHasShifts = this.state.shifts.find((dateWithShifts) => dateWithShifts.date === date)
    if (selectedDateHasShifts) {
      const selectedShiftHasCounsellors = selectedDateHasShifts.shifts.find((shiftWithCounsellor) => shiftWithCounsellor.shift === shift)

      if (selectedShiftHasCounsellors) {
        counsellor = selectedShiftHasCounsellors.counsellors[0]
      }
    }

    return counsellor
  }

  findCounsellor = (counsellorId) => {
    return this.state.counsellors.find((counsellor) => counsellor.id === counsellorId)
  }

  removeCounsellorFromShift = (date, shift, counsellor) => {
    const updatedSchedule = ApiClient.removeCounsellorFromShift(this.state.shifts, date, shift, counsellor)

    this.setState({shifts: updatedSchedule})
  }

  render() {
    return (
      <CounsellorApiContext.Provider
        value={{
          scheduledShifts: this.state.shifts,
          scheduleNewShift: this.scheduleNewShift,
          removeCounsellorFromShift: this.removeCounsellorFromShift,
          listOfAllCounsellors: this.state.counsellors,
          findPotentialCounsellorAlreadyOnShift: this.findPotentialCounsellorAlreadyOnShift,
          findCounsellor: this.findCounsellor
        }}
      >
        {this.props.children}
      </CounsellorApiContext.Provider>
    )
  }
}

export const CounsellorApiConsumer = CounsellorApiContext.Consumer
