import React, { Component } from 'react'
import ApiClient from './peopleApi'

export const PeopleApiContext = React.createContext()

export class PeopleApiProvider extends Component {
  constructor() {
    super()

    this.state = {
      shifts: ApiClient.getScheduledShifts(),
      counsellors: ApiClient.getCounsellors(),
      ebus: ApiClient.getEbus()
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

  findEbu = (ebuId) => {
    return this.state.ebus.find((ebu) => ebu.id === ebuId)
  }

  removeCounsellorFromShift = (date, shift, counsellor) => {
    const updatedSchedule = ApiClient.removeCounsellorFromShift(this.state.shifts, date, shift, counsellor)

    this.setState({shifts: updatedSchedule})
  }

  render() {
    return (
      <PeopleApiContext.Provider
        value={{
          scheduledShifts: this.state.shifts,
          scheduleNewShift: this.scheduleNewShift,
          removeCounsellorFromShift: this.removeCounsellorFromShift,
          listOfAllCounsellors: this.state.counsellors,
          findPotentialCounsellorAlreadyOnShift: this.findPotentialCounsellorAlreadyOnShift,
          findCounsellor: this.findCounsellor,

          listOfAllEbus: this.state.ebus,
          findEbu: this.findEbu
        }}
      >
        {this.props.children}
      </PeopleApiContext.Provider>
    )
  }
}

export const PeopleApiConsumer = PeopleApiContext.Consumer
