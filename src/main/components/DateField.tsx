// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { Datepicker } from 'baseui/datepicker'
import { FormControl } from 'baseui/form-control'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const DateField = component<DateFieldProps>({
  displayName: 'DateField',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateDateFieldProps) }
    : null,
 
  render: DateFieldView
})

// --- types ---------------------------------------------------------

type DateFieldProps = {
  label?: string
}

// --- validation ----------------------------------------------------

const validateDateFieldProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useDateFieldStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function DateFieldView({
  label
}: DateFieldProps) {
  const classes = useDateFieldStyles()

  return (
    <FormControl label={label}>
      <Datepicker/>
    </FormControl>
  )
}

// --- exports -------------------------------------------------------

export default DateField 