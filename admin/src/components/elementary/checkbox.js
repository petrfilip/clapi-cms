import React from 'preact/compat'
import styled from 'styled-components'

const Checkbox = (props) => {
  return (
    <StyledInput>
      <input {...props} type={'checkbox'} />
    </StyledInput>
  )
}

const StyledInput = styled.div`
  margin: 5px;
  padding: 5px;
`

export default Checkbox
