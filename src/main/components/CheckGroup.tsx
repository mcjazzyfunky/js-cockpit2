// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const CheckGroup = component<CheckGroupProps>({
  displayName: 'CheckGroup',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateCheckGroupProps) }
    : null,
 
  render: CheckGroupView
})

// --- types ---------------------------------------------------------

type CheckGroupProps = {
}

// --- validation ----------------------------------------------------

const validateCheckGroupProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useCheckGroupStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function CheckGroupView({
}: CheckGroupProps) {
  const classes = useCheckGroupStyles()

  return (
    '[CheckGroup]'
  )
}

// --- exports -------------------------------------------------------

export default CheckGroup 