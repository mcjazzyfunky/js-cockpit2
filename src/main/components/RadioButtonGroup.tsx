// external imports
import React, { FormEvent } from 'react'
import { component, isNode } from 'js-react-utils'
import { Input } from 'baseui/input'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import FieldWrapper from './FieldWrapper'
import useFormCtrl from '../hooks/useFormCtrl'
import useDefaultSize from '../hooks/useDefaultSize'

// derived import
const { useCallback, useEffect, useState, useRef } = React

// --- components ----------------------------------------------------

const RadioButtonGroup = component<RadioButtonGroupProps>({
  displayName: 'RadioButtonGroup',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateRadioButtonGroupProps) }
    : null,
 
  render: RadioButtonGroupView
})

// --- types ---------------------------------------------------------

type RadioButtonGroupProps = {
  name?: string,
  label?: string,
  required?: boolean,
  disabled?: boolean,
  messageOnError?: string
}

// --- validation ----------------------------------------------------

const validateRadioButtonGroupProps = Spec.checkProps({
  optional: {
    name: Spec.string,
    label: Spec.string,
    disabled: Spec.boolean,
    required: Spec.boolean,
    messageOnError: Spec.string
  }
})

// --- styles --------------------------------------------------------

const useRadioButtonGroupStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function RadioButtonGroupView({
  name,
  label,
  disabled,
  required = false,
  messageOnError
}: RadioButtonGroupProps) {
  const
    [value, setValue] = useState(''),
    [error, setError] = useState(''),
    defaultSize = useDefaultSize(),
    classes = useRadioButtonGroupStyles(),
    formCtrl = useFormCtrl(),
    nameRef = useRef(name),
    valueRef = useRef(value),
    requiredRef = useRef(required),
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
    messageOnErrorRef.current = messageOnError
  }, [name, value, required,  messageOnError])
  
  useEffect(() => {
  }, [value])

  useEffect(() => {
    if (formCtrl) {
      return formCtrl.registerComponent((update: boolean) => {
        const errorMsg = validate(
          valueRef.current,
          requiredRef.current
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
    <div className={classes.root}>
      <FieldWrapper label={label} required={required} error={error}>
        <div>[RadioButtonGroup]</div>
      </FieldWrapper> 
    </div>
  )
}

// --- misc ----------------------------------------------------------

function validate(value: string, required: boolean, pattern?: RegExp, messageOnError?: string) {
  let ret: string | null = null

  if (required && !value) {
    ret = messageOnError
      ? messageOnError
      : 'This is a required field'
  }

  return ret
}

// --- exports -------------------------------------------------------

export default RadioButtonGroup 