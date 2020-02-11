import React, { memo, useEffect } from 'react'
import styled from 'styled-components'
import config from '../../config'
import { CounsellorApiConsumer } from '../../api/counsellors/CounsellorApiContext'

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
  selectedCounsellor, changeCounsellor, selectedTime, changeTime, unavailableTimeBlocks
}) => {
  useEffect(() => {
    return () => {
      changeTime(null)
      changeCounsellor('')
    }
  }, [changeTime, changeCounsellor])

  return (
    <CounsellorApiConsumer>
      {({listOfAllCounsellors}) => (
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
              !unavailableTimeBlocks.includes(config.SHIFT_STRINGS.FULL.key) &&
              <Option>
                <input
                  type="radio"
                  name="time_option"
                  value={config.SHIFT_STRINGS.FULL.key}
                  id={config.SHIFT_STRINGS.FULL.key}
                  checked={selectedTime === config.SHIFT_STRINGS.FULL.key}
                  onChange={() => changeTime(config.SHIFT_STRINGS.FULL.key)}
                />
                <label htmlFor={config.SHIFT_STRINGS.FULL.key}>{config.SHIFT_STRINGS.FULL.value}</label>
              </Option>
            }

            {
              !unavailableTimeBlocks.includes(config.SHIFT_STRINGS.FIRST_HALF.key) &&
              <Option>
                <input
                  type="radio"
                  name="time_option"
                  value={config.SHIFT_STRINGS.FIRST_HALF.key}
                  id={config.SHIFT_STRINGS.FIRST_HALF.key}
                  checked={selectedTime === config.SHIFT_STRINGS.FIRST_HALF.key}
                  onChange={() => changeTime(config.SHIFT_STRINGS.FIRST_HALF.key)}
                />
                <label htmlFor={config.SHIFT_STRINGS.FIRST_HALF.key}>{config.SHIFT_STRINGS.FIRST_HALF.value}</label>
              </Option>
            }

            {
              !unavailableTimeBlocks.includes(config.SHIFT_STRINGS.SECOND_HALF.key) &&
              <Option>
                <input
                  type="radio"
                  name="time_option"
                  value={config.SHIFT_STRINGS.SECOND_HALF.key}
                  id={config.SHIFT_STRINGS.SECOND_HALF.key}
                  checked={selectedTime === config.SHIFT_STRINGS.SECOND_HALF.key}
                  onChange={() => changeTime(config.SHIFT_STRINGS.SECOND_HALF.key)}
                />
                <label htmlFor={config.SHIFT_STRINGS.SECOND_HALF.key}>{config.SHIFT_STRINGS.SECOND_HALF.value}</label>
              </Option>
            }
          </fieldset>
        </div>
      )}
    </CounsellorApiConsumer>
  )
})

export default PopulateShift
