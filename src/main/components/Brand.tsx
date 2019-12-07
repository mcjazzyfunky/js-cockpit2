// external imports
import React, { ReactNode } from 'react'
import { component, isNode } from 'js-react-utils'
import { FiLayers as DefaultLogo } from 'react-icons/fi'
import * as Spec from 'js-spec/validators'

// internal import
import defineStyles from '../styling/tools/defineStyles'
import Text from './Text'

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
  logo?: ReactNode,
  size?: 'small' | 'medium' | 'large',
  multicolor?: boolean
}

// --- validation ----------------------------------------------------

const validateBrandProps = Spec.checkProps({
  optional: {
    vendor: Spec.string,
    title: Spec.string,
    logo: isNode,
    size: Spec.oneOf('small', 'medium', 'large'),
    multicolor: Spec.boolean
  }
})

// --- styles --------------------------------------------------------

const useBrandStyles = defineStyles(theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center'
    },

    column1: {
      padding: '0 12px 0 0'
    },
    
    column2: {
      display: 'flex',
      flexDirection: 'column'
    },

    logo: {
    },

    defaultLogo: {
      width: '26px',
      height: '26px',
      paddingTop: '5px' // TODO
    },

    logoMulticolor: {
      color: theme.colors.accent400
    },

    vendor: {
      ...theme.typography.font200,
      fontSize: '14px',
      lineHeight: '15px'
    },
  
    title: {
      ...theme.typography.font200,
      fontSize: '18px'
    },

    scaleSmall: {

    },

    scaleLarge: {

    }
  }
})

// --- view ----------------------------------------------------------

function BrandView({
  vendor,
  title,
  logo,
  multicolor = false
}: BrandProps) {
  const classes = useBrandStyles()

  const brandLogo = logo
    ? logo
    : <DefaultLogo className={classes.defaultLogo}/>

  const column1 =
    <div className={classes.column1}>
      <div className={multicolor ? classes.logoMulticolor : classes.logo}>
        {brandLogo}
      </div>
    </div>

  const column2 =
    <div className={classes.column2}>
      {vendor ? <div className={classes.vendor}>{vendor}</div> : null }
      {title ? <div className={classes.title}>{title}</div> : null}
    </div>


  return (
    <div className={classes.root}>
      {column1}
      {column2}
    </div>
  )
}

// --- exports -------------------------------------------------------

export default Brand 
