// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const TextInput = component<TextInputProps>({
  displayName: 'TextInput',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateTextInputProps) }
    : null,
 
  render: TextInputView
})

// --- types ---------------------------------------------------------

type TextInputProps = {
  name?: string,
  label?: string,
  disabled?: boolean,
  size?: 'compact' | 'default' | 'large'
}

// --- validation ----------------------------------------------------

const validateTextInputProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    size: Spec.oneOf('compact', 'default', 'large')
  }
})

// --- styles --------------------------------------------------------

const useTextInputStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function TextInputView({
  name,
  label,
  disabled,
  size = 'default'
}: TextInputProps) {
  const classes = useTextInputStyles()

  return (
    <FormControl label={label}>
      <Input disabled={disabled} name={name} size={size}/>
    </FormControl>
  )
}

// --- exports -------------------------------------------------------

export default TextInput 