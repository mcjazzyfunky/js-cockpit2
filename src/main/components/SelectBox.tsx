// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Select } from 'baseui/select'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const SelectBox = component<SelectBoxProps>({
  displayName: 'SelectBox',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateSelectBoxProps) }
    : null,
 
  render: SelectBoxView
})

// --- types ---------------------------------------------------------

type SelectBoxProps = {
  name?: string,
  label?: string,
  disabled?: boolean
}

// --- validation ----------------------------------------------------

const validateSelectBoxProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useSelectBoxStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function SelectBoxView({
  name,
  label,
  disabled
}: SelectBoxProps) {
  const classes = useSelectBoxStyles()

  return (
      <Select
        disabled={disabled}
        value={[{ id: 'US' }]}
      
        options={[
          { id: 'US', name: 'USA' },
          { id: 'FR', name: 'France' }
        ]}
      
        labelKey="id"
        valueKey="name"
      />
  )
}

// --- exports -------------------------------------------------------

export default SelectBox 