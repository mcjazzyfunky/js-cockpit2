// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../styling/tools/defineStyles'

// --- components ----------------------------------------------------

const Brand = component<BrandProps>({
  displayName: 'Brand',
  
  ...process.env.NODE_ENV === 'development' as any
    ? { validate: Spec.lazy(() => validateBrandProps) }
    : null,
 
  render: BrandView
})

// --- types ---------------------------------------------------------

type BrandProps = {
  vendor?: string,
  title?: string,
  logo?: ReactNode
}

// --- validation ----------------------------------------------------

const validateBrandProps = Spec.checkProps({
  optional: {
    vendor: Spec.string,
    title: Spec.string,
    logo: isNode
  }
})

// --- styles --------------------------------------------------------

const useBrandStyles = defineStyles(theme => {
  return {}
})

// --- view ----------------------------------------------------------

function BrandView({
  vendor,
  title,
  logo
}: BrandProps) {
  return (
    'Logo'
  )
}

// --- exports -------------------------------------------------------

export default Brand 
