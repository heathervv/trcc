import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import config from '../../config'
import { PeopleApiConsumer } from '../../api/people/PeopleApiContext'

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
`

const Select = styled.select`
  display: block;
  width: 100%;
  margin-bottom: 20px;
`

const Option = styled.div`
  display: block;
  margin-bottom: 8px;

  input,
  label {
    cursor: pointer;
  }

  label {
    padding-left: 5px;
  }
`

const PopulateEbuShift = memo(({
  selectedEbu, changeEbu, selectedTime, changeTime, unavailableTimeBlocks
}) => {
  useEffect(() => {
    return () => {
      changeTime(null)
      changeEbu('')
    }
  }, [changeTime, changeEbu])

  return (
    <PeopleApiConsumer>
      {({listOfAllEbus}) => (
        <div>
          <Label htmlFor="counsellor_list">Select EBU:</Label>
          <Select id="counsellor_list" value={selectedEbu} onChange={(e) => changeEbu(e.target.value)}>
            <option value="">EBUs</option>
            {
              listOfAllEbus.map((ebu) => (
                <option value={ebu.id} key={ebu.id}>
                  {ebu.name}
                </option>
              ))
            }
          </Select>

          <Label htmlFor="time_options">Select time:</Label>
          <fieldset id="time_options">
            {
              !unavailableTimeBlocks.includes(config.EBU_SHIFTS.FULL) &&
              <Option>
                <input
                  type="radio"
                  name="time_option"
                  value={config.EBU_SHIFTS.FULL}
                  id={config.EBU_SHIFTS.FULL}
                  checked={selectedTime === config.EBU_SHIFTS.FULL}
                  onChange={() => changeTime(config.EBU_SHIFTS.FULL)}
                />
                <label htmlFor={config.EBU_SHIFTS.FULL}>{config.EBU_SHIFTS.FULL}</label>
              </Option>
            }

            {
              !unavailableTimeBlocks.includes(config.EBU_SHIFTS.FIRST_HALF) &&
              <Option>
                <input
                  type="radio"
                  name="time_option"
                  value={config.EBU_SHIFTS.FIRST_HALF}
                  id={config.EBU_SHIFTS.FIRST_HALF}
                  checked={selectedTime === config.EBU_SHIFTS.FIRST_HALF}
                  onChange={() => changeTime(config.EBU_SHIFTS.FIRST_HALF)}
                />
                <label htmlFor={config.EBU_SHIFTS.FIRST_HALF}>{config.EBU_SHIFTS.FIRST_HALF}</label>
              </Option>
            }

            {
              !unavailableTimeBlocks.includes(config.EBU_SHIFTS.SECOND_HALF) &&
              <Option>
                <input
                  type="radio"
                  name="time_option"
                  value={config.EBU_SHIFTS.SECOND_HALF}
                  id={config.EBU_SHIFTS.SECOND_HALF}
                  checked={selectedTime === config.EBU_SHIFTS.SECOND_HALF}
                  onChange={() => changeTime(config.EBU_SHIFTS.SECOND_HALF)}
                />
                <label htmlFor={config.EBU_SHIFTS.SECOND_HALF}>{config.EBU_SHIFTS.SECOND_HALF}</label>
              </Option>
            }
          </fieldset>
        </div>
      )}
    </PeopleApiConsumer>
  )
})

export default PopulateEbuShift
