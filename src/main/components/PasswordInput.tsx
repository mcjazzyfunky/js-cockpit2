// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const PasswordInput = component<PasswordInputProps>({
  displayName: 'PasswordInput',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validatePasswordInputProps) }
    : null,
 
  render: PasswordInputView
})

// --- types ---------------------------------------------------------

type PasswordInputProps = {
  name?: string,
  label?: string,
  disabled?: boolean,
  size?: 'compact' | 'default' | 'large'
}

// --- validation ----------------------------------------------------

const validatePasswordInputProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    size: Spec.oneOf('compact', 'default', 'large')
  }
})

// --- styles --------------------------------------------------------

const usePasswordInputStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function PasswordInputView({
  name,
  label,
  disabled,
  size = 'default'
}: PasswordInputProps) {
  const classes = usePasswordInputStyles()

  return (
    <FormControl label={label}>
      <Input type="password" disabled={disabled} name={name} size={size}/>
    </FormControl>
  )
}

// --- exports -------------------------------------------------------

export default PasswordInput 