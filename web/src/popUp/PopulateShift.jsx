import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import { ApiConsumer } from '../api/ApiContext'

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

const PopulateShift = memo(({
  selectedCounsellor,
  changeCounsellor,
  selectedTime,
  changeTime,
  unavailableTimeBlocks
}) => {
  useEffect(() => {
    return () => {
      changeTime(null)
      changeCounsellor('')
    }
  }, [changeTime, changeCounsellor])

  return (
    <ApiConsumer>
      {({ listOfAllCounsellors }) => (
        <div>
          <Label htmlFor="counsellor_list">Select counsellor:</Label>
          <Select id="counsellor_list" value={selectedCounsellor} onChange={(e) => changeCounsellor(e.target.value)}>
            <option value="">Counsellors</option>
            {
              listOfAllCounsellors.map((counsellor) => (
                <option value={counsellor.id} key={counsellor.id}>
                  {counsellor.name}
                </option>
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
      )}
    </ApiConsumer>
  )
})

export default PopulateShift
