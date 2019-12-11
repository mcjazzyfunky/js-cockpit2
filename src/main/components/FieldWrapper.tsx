// external imports
import React, { ReactNode } from 'react'
import { component, isNode, withChildren } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'
import LabelPosition from '../enums/LabelPosition'
import useDefaultLabelPosition from '../hooks/useDefaultLabelPosition'

// derived imports
const { Children } = React

// --- components ----------------------------------------------------

const FieldWrapper = component<FieldWrapperProps>({
  displayName: 'FieldWrapper',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateFieldWrapperProps) }
    : null,
 
  render: FieldWrapperView
})

// --- types ---------------------------------------------------------

type FieldWrapperProps = {
  label?: string,
  required?: boolean,
  error?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateFieldWrapperProps = Spec.checkProps({
  optional: {
    label: Spec.string,
    required: Spec.boolean,
    error: Spec.string,
    children: withChildren(Spec.singleOf(isNode))
  }
})

// --- styles --------------------------------------------------------

const useFieldWrapperStyles = defineStyles(
  (theme, required: boolean, labelAbove: boolean) => {
  
  const labelWidth = labelAbove ? '' : '160px' 

  return {
    root: {
      display: 'flex',
      flexDirection: labelAbove ? 'column' : 'row',
      alignItems: labelAbove ? 'stretch' : 'center',
      margin: '3px 0'
    },

    label: {
      width: labelWidth,
      minWidth: labelWidth,
      maxWidth: labelWidth,
      ...theme.typography.font250,
      textAlign: labelAbove ? 'inherit' : 'right',
      margin: labelAbove ? '0 0 5px 0' : '0 0.9em 0 0'
    },

    asterisk: {
      position: 'relative',
      display: 'inline-block',
      fontSize: '15px',
      marginLeft: '3px',
      bottom: '1px',
      color: theme.colors.warning400
    },

    field: {
      flexGrow: 1
    }
  }
})

// --- view ----------------------------------------------------------

function FieldWrapperView({
  label,
  required = false,
  error,
  children
}: FieldWrapperProps) {
  const
    defaultLabelPosition = useDefaultLabelPosition(),

    classes = useFieldWrapperStyles(
        required, defaultLabelPosition === LabelPosition.Above),

    maybeAsterisk = label && label.length > 0 && required
      ? <div className={classes.asterisk}>*</div>
      : null

  return (
    <label className={classes.root}>
      <div className={classes.label}>
        {label}{maybeAsterisk}
      </div>
      <div className={classes.field}>
        {Children.only(children)}
        <div>
          {error}
        </div>
      </div>
    </label>
  )
}

// --- exports -------------------------------------------------------

export default FieldWrapper