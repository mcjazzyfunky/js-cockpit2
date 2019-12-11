// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import useFormCtrl from '../hooks/useFormCtrl'
import useDefaultSize from '../hooks/useDefaultSize'

// derived import
const { useCallback, useEffect, useState, useRef } = React

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
  required?: boolean,
  disabled?: boolean,
  size?: 'compact' | 'default' | 'large',
  pattern?: RegExp,
  messageOnError?: string
}

// --- validation ----------------------------------------------------

const validateTextFieldProps = Spec.checkProps({
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
  disabled,
  required = false,
  size,
  pattern,
  messageOnError
}: TextFieldProps) {
  const
    [value, setValue] = useState(''),
    [error, setError] = useState(''),
    classes = useTextFieldStyles(),
    defaultSize = useDefaultSize(),
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
      <Input disabled={disabled} name={name} size={size || defaultSize} onChange={onInput}/>
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

export default TextField 