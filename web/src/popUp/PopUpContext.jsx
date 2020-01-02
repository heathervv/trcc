import React, { Component } from 'react'
import TEMP_FAKE_DATA from '../dummy_data.json'
import TEMP_COUNSELLORS from '../dummy_counsellors.json'

export const PopUpContext = React.createContext()

export class PopUpProvider extends Component {
  constructor() {
    super()

    this.state = {
      isVisible: false,
      selectedShift: {
        date: null,
        shift: null,
        counsellor: null
      }
    }
  }

  changeVisibility = () => {
    const isVisible = this.state.isVisible

    this.setState({ isVisible: !isVisible })
  }

  changeSelectedShift = (date, shift) => {
    let counsellor = null

    const selectedDateHasShifts = TEMP_FAKE_DATA.find((dateWithShifts) => dateWithShifts.date === date)
    if (selectedDateHasShifts) {
      const selectedShiftHasCounsellors = selectedDateHasShifts.shifts.find((shiftWithCounsellor) => shiftWithCounsellor.shift === shift)

      if (selectedShiftHasCounsellors) {
        const scheduledCounsellor = selectedShiftHasCounsellors.counsellors[0]

        counsellor = {
          name: TEMP_COUNSELLORS.find((x) => x.id === scheduledCounsellor.id).name,
          half: scheduledCounsellor.half
        }
      }
    }

    this.setState({
      selectedShift: {
        date,
        shift,
        counsellor
      }
    })
  }

  render() {
    return (
      <PopUpContext.Provider
        value={{
          changeVisibility: this.changeVisibility,
          isVisible: this.state.isVisible,
          changeSelectedShift: this.changeSelectedShift,
          selectedShift: this.state.selectedShift
        }}
      >
        {this.props.children}
      </PopUpContext.Provider>
    )
  }
}

export const PopUpConsumer = PopUpContext.Consumer
