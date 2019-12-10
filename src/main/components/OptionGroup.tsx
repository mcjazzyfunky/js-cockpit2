// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../tools/defineStyles'

// --- components ----------------------------------------------------

const SelectBox = component<SelectBoxProps>({
  displayName: 'SelectBox',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateSelectBoxProps) }
    : null,
 
  render: SelectBoxView
})

// --- types ---------------------------------------------------------

type SelectBoxProps = {
}

// --- validation ----------------------------------------------------

const validateSelectBoxProps = Spec.checkProps({
  optional: {
  }
})

// --- styles --------------------------------------------------------

const useSelectBoxStyles = defineStyles(theme => {
  return {
    root: {
    },
  }
})

// --- view ----------------------------------------------------------

function SelectBoxView({
}: SelectBoxProps) {
  const classes = useSelectBoxStyles()

  return (
    '[SelectBox]'
  )
}

// --- exports -------------------------------------------------------

export default SelectBox 