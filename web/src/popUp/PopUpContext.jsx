import React, { Component } from 'react'

export const PopUpContext = React.createContext()

export const FLOWS = {
  ADD: 'add',
  REMOVE: 'remove'
}

export class PopUpProvider extends Component {
  constructor() {
    super()

    this.state = {
      isVisible: false,
      ebu: {
        selected: false,
        selectedShift: {
          date: null,
          shift: null,
          ebu: null
        },
        flow: FLOWS.ADD
      },
      counsellor: {
        selected: false,
        selectedShift: {
          date: null,
          shift: null,
          person: null
        },
        flow: FLOWS.ADD
      }
    }
  }

  changeVisibility = () => {
    const isVisible = this.state.isVisible

    this.setState({
      isVisible: !isVisible,
      ebu: {
        ...this.state.ebu,
        selected: false,
      },
      counsellor: {
        ...this.state.counsellor,
        selected: false
      }
    })
  }

  populatePopUpWithEbu = (ebuId = null) => {
    // TODO() this function is very bare bones.

    this.setState({
      ebu: {
        ...this.state.ebu,
        selected: true,
        flow: ebuId ? FLOWS.REMOVE : FLOWS.ADD
      }
    })
  }

  populatePopUpWithCounsellor = (date, shift, counsellor, duration = null) => {
    const selectedCounsellor = { ...counsellor }

    // add duration key to counsellor IF duration is passed
    if (duration) {
      selectedCounsellor.duration = duration
    }

    this.setState({
      counsellor: {
        selected: true,
        selectedShift: {
          date,
          shift,
          person: selectedCounsellor
        },
        flow: duration ? FLOWS.REMOVE : FLOWS.ADD
      }
    })
  }

  render() {
    return (
      <PopUpContext.Provider
        value={{
          changeVisibility: this.changeVisibility,
          isVisible: this.state.isVisible,

          populatePopUpWithCounsellor: this.populatePopUpWithCounsellor,
          counsellor: this.state.counsellor,

          populatePopUpWithEbu: this.populatePopUpWithEbu,
          ebu: this.state.ebu
        }}
      >
        {this.props.children}
      </PopUpContext.Provider>
    )
  }
}

export const PopUpConsumer = PopUpContext.Consumer
