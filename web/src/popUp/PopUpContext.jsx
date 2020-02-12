import React, { Component } from 'react'
import config from "../config";

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
          shift: {},
          ebu: null
        },
        flow: FLOWS.ADD
      },
      counsellor: {
        selected: false,
        selectedShift: {
          date: null,
          shift: {},
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

  populatePopUpWithEbu = (date, shift, ebu = null) => {
    const selectedEbu = { ...ebu }

    this.setState({
      ebu: {
        selected: true,
        selectedShift: {
          date,
          shift: {
            name: shift,
            time: config.EBU_SHIFTS[shift]
          },
          person: selectedEbu
        },
        flow: ebu ? FLOWS.REMOVE : FLOWS.ADD
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
          shift: {
            name: shift,
            time: config.SHIFTS[shift]
          },
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
