// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import * as Spec from 'js-spec/validators'

// --- components ----------------------------------------------------

const Brand = component<BrandProps>({
  displayName: 'Brand',
  validate: Spec.lazy(() => validateBrandProps),
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
