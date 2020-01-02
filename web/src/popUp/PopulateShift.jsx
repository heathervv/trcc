import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import TEMP_COUNSELLORS from '../dummy_counsellors.json'

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

const PopulateShift = memo(({ selectedTime, changeTime, unavailableTimeBlocks }) => {
  useEffect(() => {
    return () => {
      changeTime(null)
    }
  }, [changeTime])

  return (
    <div>
      <Label htmlFor="counsellor_list">Select counsellor:</Label>
      <Select id="counsellor_list">
        <option key="null">Counsellors</option>
        {
          TEMP_COUNSELLORS.map((counsellor) => (
            <option key={counsellor.id}>{counsellor.name}</option>
          ))
        }
      </Select>

      <Label htmlFor="time_options">Select time:</Label>
      <fieldset id="time_options">
        {
          !unavailableTimeBlocks.includes('full_shift') &&
          <Option>
            <input
              type="radio"
              name="time_option"
              value="full_shift"
              id="full_shift"
              checked={selectedTime === 'full_shift'}
              onChange={() => changeTime('full_shift')}
            />
            <label htmlFor="full_shift">Full shift (8 hours)</label>
          </Option>
        }

        {
          !unavailableTimeBlocks.includes('half_shift_first') &&
          <Option>
            <input
              type="radio"
              name="time_option"
              value="half_shift_first"
              id="half_shift_first"
              checked={selectedTime === 'half_shift_first'}
              onChange={() => changeTime('half_shift_first')}
            />
            <label htmlFor="half_shift_first">First half (4 hours)</label>
          </Option>
        }

        {
          !unavailableTimeBlocks.includes('half_shift_second') &&
          <Option>
            <input
              type="radio"
              name="time_option"
              value="half_shift_second"
              id="half_shift_second"
              checked={selectedTime === 'half_shift_second'}
              onChange={() => changeTime('half_shift_second')}
            />
            <label htmlFor="half_shift_second">Second half (4 hours)</label>
          </Option>
        }
      </fieldset>
    </div>
  )
})

export default PopulateShift
