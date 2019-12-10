// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const TextField = component<TextFieldProps>({
  displayName: 'TextField',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateTextFieldProps) }
    : null,
 
  render: TextFieldView
})

// --- types ---------------------------------------------------------

type TextFieldProps = {
  name?: string,
  label?: string,
  disabled?: boolean
}

// --- validation ----------------------------------------------------

const validateTextFieldProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useTextFieldStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function TextFieldView({
  name,
  label,
  disabled
}: TextFieldProps) {
  const classes = useTextFieldStyles()

  return (
    <FormControl label={label}>
      <Input disabled={disabled} name={name}/>
    </FormControl>
  )
}

// --- exports -------------------------------------------------------

export default TextField 