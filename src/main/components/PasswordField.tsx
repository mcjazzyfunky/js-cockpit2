// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import useFormCtrl from '../hooks/useFormCtrl'

// derived imports
const { useCallback, useEffect, useRef, useState } = React

// --- components ----------------------------------------------------

const PasswordField = component<PasswordFieldProps>({
  displayName: 'PasswordField',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validatePasswordFieldProps) }
    : null,
 
  render: PasswordFieldView
})

// --- types ---------------------------------------------------------

type PasswordFieldProps = {
  name?: string,
  label?: string,
  disabled?: boolean,
  required?: boolean,
  size?: 'compact' | 'default' | 'large'
  pattern?: RegExp,
  messageOnError?: string
}

// --- validation ----------------------------------------------------

const validatePasswordFieldProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    size: Spec.oneOf('compact', 'default', 'large'),
    pattern: Spec.instanceOf(RegExp),
    messageOnError: Spec.string
  }
})

// --- styles --------------------------------------------------------

const usePasswordFieldStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function PasswordFieldView({
  name,
  label,
  disabled,
  required = false,
  size = 'default',
  pattern,
  messageOnError
}: PasswordFieldProps) {
  const
    [value, setValue] = useState(''),
    [error, setError] = useState(''),
    classes = usePasswordFieldStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
    patternRef = useRef(pattern),
    messageOnErrorRef = useRef(messageOnError),

    onInput = useCallback((ev: FormEvent<HTMLInputElement>) => {
      setValue(ev.currentTarget.value)

      if (error) {
        setError('')
      }
    }, [error])

  useEffect(() => {
    nameRef.current = name
    valueRef.current = value
    requiredRef.current = required
    patternRef.current = pattern,
    messageOnErrorRef.current = messageOnError
  }, [name, value, required, pattern, messageOnError])
  
  useEffect(() => {
  }, [value])

  useEffect(() => {
    if (formCtrl) {
      return formCtrl.registerComponent((update: boolean) => {
        const errorMsg = validate(
          valueRef.current,
          requiredRef.current,
          patternRef.current,
          messageOnErrorRef.current
        )

        if (update && errorMsg) {
          setError(errorMsg)
        }

        return !errorMsg
          ? {
              name: nameRef.current || '',
              valid: true,
              value: valueRef.current
            }
          : {
              name: nameRef.current || '',
              valid: false
            }
      })
    }
  }, [formCtrl])

  return (
    <FormControl label={label} error={error}>
      <Input type="password" disabled={disabled} name={name} size={size} onChange={onInput}/>
    </FormControl>
  )
}

// --- misc ----------------------------------------------------------

function validate(value: string, required: boolean, pattern?: RegExp, messageOnError?: string) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError
      ? messageOnError
      : 'This is a required field'
  } else if (value && pattern && !pattern.test(value)) {
    ret = messageOnError
      ? messageOnError
      : 'Please enter a valid value'
  }

  return ret
}


// --- exports -------------------------------------------------------

export default PasswordField 