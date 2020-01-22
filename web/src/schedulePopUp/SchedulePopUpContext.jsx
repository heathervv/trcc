import React, { Component } from 'react'

export const SchedulePopUpContext = React.createContext()

export const FLOWS = {
  ADD: 'add',
  REMOVE: 'remove'
}

export class SchedulePopUpProvider extends Component {
  constructor() {
    super()

    this.state = {
      isVisible: false,
      selectedShift: {
        date: null,
        shift: null,
        counsellor: null
      },
      flow: FLOWS.ADD
    }
  }

  changeVisibility = () => {
    const isVisible = this.state.isVisible

    this.setState({ isVisible: !isVisible })
  }

  changeSelectedShift = (date, shift, counsellor, counsellorDuration = null) => {
    const selectedCounsellor = counsellor

    if (counsellorDuration) {
      selectedCounsellor.duration = counsellorDuration
    }
    this.setState({
      selectedShift: {
        date,
        shift,
        counsellor: selectedCounsellor
      },
      flow: counsellorDuration ? FLOWS.REMOVE : FLOWS.ADD
    })
  }

  render() {
    return (
      <SchedulePopUpContext.Provider
        value={{
          changeVisibility: this.changeVisibility,
          isVisible: this.state.isVisible,
          changeSelectedShift: this.changeSelectedShift,
          selectedShift: this.state.selectedShift,
          flow: this.state.flow
        }}
      >
        {this.props.children}
      </SchedulePopUpContext.Provider>
    )
  }
}

export const SchedulePopUpConsumer = SchedulePopUpContext.Consumer
