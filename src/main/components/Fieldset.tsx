// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const Fieldset = component<FieldsetProps>({
  displayName: 'Fieldset',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateFieldsetProps) }
    : null,
 
  render: FieldsetView
})

// --- types ---------------------------------------------------------

type FieldsetProps = {
  title?: string,
  children?: ReactNode
}

// --- validation ----------------------------------------------------

const validateFieldsetProps = Spec.checkProps({
  optional: {
    title: Spec.string,
    children: isNode
  }
})

// --- styles --------------------------------------------------------

const useFieldsetStyles = defineStyles(theme => {
  return {
    root: {
    },

    title: {
    }
  }
})

// --- view ----------------------------------------------------------

function FieldsetView({
  title,
  children
}: FieldsetProps) {
  const classes = useFieldsetStyles()

  return (
    <div className={`${classes.root}`}>
      <div className={`${classes.title}`}>
        {title}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Fieldset