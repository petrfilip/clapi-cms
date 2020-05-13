import React from 'react'
import Select from 'react-select'
import { useState } from 'preact/hooks'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const SelectInput = ({ id, initialValue, config, onInputChangeCallback }) => {
  console.log(config)
  function handleChange(selected) {
    onInputChangeCallback(id, selected.value)
  }

  function findByValue(options, value) {
    return options.find((option) => option.value === value)
  }

  return (
    <Select
      options={config.options}
      value={findByValue(options, initialValue)}
      onChange={handleChange}
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

export default SelectInput
