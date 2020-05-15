import React from 'react'
import Creatable from 'react-select/creatable'
import { slugify } from '../../../utils/string-utils'

const TagInput = ({ id, initialValue, config, onInputChangeCallback }) => {
  function handleChange(data) {
    const newData = data.map((item) => {
      return { label: item.label, value: slugify(item.value) }
    })
    onInputChangeCallback(id, newData)
  }

  function findByValue(options, value) {
    return options && options.find((option) => option.value === value)
  }

  return (
    <Creatable
      defaultValue={initialValue || []}
      value={findByValue((config && config.options) || [], initialValue)}
      onChange={handleChange}
      isMulti={true}
      styles={customStyles}
    />
  )
}

const customStyles = {
  container: (base) => ({
    ...base,
    padding: 5,
    width: '95%',
    margin: 5,
  }),
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '30px',
    borderRadius: 0,
    margin: 0,
    padding: 0,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: (state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',
  }),
}

export default TagInput
