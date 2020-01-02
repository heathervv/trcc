import React, { Component } from 'react'

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

  changeSelectedShift = (date, shift, counsellor) => {
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
